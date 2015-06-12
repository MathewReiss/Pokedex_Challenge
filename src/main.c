#include <pebble.h>
#include "pokedex.h"

#define POKEDEX_DATA 0
#define START_TIME 1
#define DATA 0
	
int DEBUG = 0;
	
int pokedex[152];
uint8_t array[19];
int num_caught = 0;
char num_caught_string[8];
int recent_catch = 0;
	
Window      *window;
TextLayer   *text_layer;
Layer *fake_status_bar;

Layer *transition_layer;

GBitmap     *poke_image;
BitmapLayer *poke_image_layer;

GBitmap *trainer_image;
Layer *trainer_layer;
GBitmap     *top_bar_image;
BitmapLayer *top_bar_layer;
GBitmap     *bottom_bar_image;
BitmapLayer *bottom_bar_layer;

GBitmap *star;

GFont *custom_font;

time_t start_time;
char time_diff[16];

int currentID;
int mode; // 1 type, 2 data 
#define MODE_TYPE 1
#define MODE_DATA 2
	
char current_text[64];
char recent_catch_request_string[4];

bool trainer_visible = false;

void animate_layer(Layer *layer, GRect *start, GRect *finish, int duration, int direction){
	PropertyAnimation *anim = property_animation_create_layer_frame(layer, start, finish);
	animation_set_duration((Animation*) anim, duration);
	if(direction == 0) animation_set_curve((Animation*) anim, AnimationCurveEaseOut);
	else animation_set_curve((Animation*) anim, AnimationCurveEaseIn);
	animation_schedule((Animation*) anim);
}

int TRANSITION = 0, count = 0;
#define COVER 0
#define REVEAL 1

void send_request(int key, char *request){	
	Tuplet request_tuplet = TupletCString(key, request);
	DictionaryIterator *iter;
	app_message_outbox_begin(&iter);
	dict_write_tuplet(iter, &request_tuplet);
	dict_write_end(iter);
	app_message_outbox_send();
}

void inbox_received_handler(DictionaryIterator *iter, void *context){
	//if(recent_catch != 0){
		snprintf(recent_catch_request_string, 4, "%i", recent_catch);
		send_request(DATA, recent_catch_request_string);
	//}
}

void update_selection() {
	gbitmap_destroy( poke_image );
	
	if(DEBUG == 1) APP_LOG(APP_LOG_LEVEL_DEBUG, "update selection 1");
	if (currentID < 1){    currentID = 1; vibes_short_pulse(); }
	if (currentID > NUM_POKEMON){  currentID = NUM_POKEMON; vibes_short_pulse(); }
	
	if(DEBUG == 1) APP_LOG(APP_LOG_LEVEL_DEBUG, "update selection 2");
	
	if(pokedex[currentID] == 1){	
		if(DEBUG == 1) APP_LOG(APP_LOG_LEVEL_DEBUG, "update selection 3 - caught");
		if (mode == MODE_TYPE){  // 1 type, 2 data
			text_layer_set_text( text_layer, poke_names[currentID-1]);
	    }
	    else{
		    text_layer_set_text( text_layer, poke_info[currentID-1]);
	    }
	
	    poke_image = gbitmap_create_with_resource( poke_images[currentID-1] );
	}
	else{
		if(DEBUG == 1) APP_LOG(APP_LOG_LEVEL_DEBUG, "update selection 3 - not caught");	
		snprintf(current_text, sizeof(current_text), " %03d      \n\n", currentID);
		strncat(current_text, "???", 4);
		text_layer_set_text( text_layer, current_text);
		
		poke_image = gbitmap_create_with_resource( RESOURCE_ID_UNKNOWN );
	}
	
	bitmap_layer_set_bitmap( poke_image_layer, poke_image);
	if(DEBUG == 1) APP_LOG(APP_LOG_LEVEL_DEBUG, "update selection 4");	
}

void transition_timer(){
	if(count != 200){
		if(count == 100){
			update_selection();
			TRANSITION = REVEAL;
		}
		count+=4;
		app_timer_register(5, transition_timer, NULL);	
	}
	else{
		count = 0;
		TRANSITION = COVER;
	}
	layer_mark_dirty(transition_layer);
}

void draw_transition_layer(Layer *layer, GContext *ctx){
	graphics_context_set_fill_color(ctx, GColorWhite);
	
	if(TRANSITION == COVER){
		graphics_fill_rect(ctx, GRect( 70, 10+16, 58, (count*58)/100), 0, GCornerNone);
		graphics_fill_rect(ctx, GRect( 0, 84, 144, (count*(84-16))/100), 0, GCornerNone);	
		graphics_fill_rect(ctx, GRect( 0, 60, 70, (count*16)/100), 0, GCornerNone);
	}
	else if(TRANSITION == REVEAL){
		graphics_fill_rect(ctx, GRect( 70, 10+16+((count-100)*58)/100, 58, ((200-count)*58)/100), 0, GCornerNone);
		graphics_fill_rect(ctx, GRect( 0, 84+((count-100)*(84-16))/100, 144, ((200-count)*(84-16))/100), 0, GCornerNone);
		graphics_fill_rect(ctx, GRect( 0, 60+((count-100)*16)/100, 70, ((200-count)*16)/100), 0, GCornerNone);	
	}
						   
}

void draw_fake_status_bar(Layer *layer, GContext *ctx){
	if(DEBUG == 1) APP_LOG(APP_LOG_LEVEL_DEBUG, "draw fake status bar 1");
	#ifdef PBL_COLOR
		graphics_context_set_fill_color(ctx, GColorRed);
		graphics_context_set_compositing_mode(ctx, GCompOpSet);
	#else
		graphics_context_set_fill_color(ctx, GColorBlack);
	#endif
		
	if(DEBUG == 1) APP_LOG(APP_LOG_LEVEL_DEBUG, "draw fake status bar 2");
		
	graphics_fill_rect(ctx, GRect(0,0,144,16), 0, GCornerNone);
	
	if(DEBUG == 1) APP_LOG(APP_LOG_LEVEL_DEBUG, "draw fake status bar 3");	
	
	if(num_caught == 151){
		graphics_draw_bitmap_in_rect(ctx, star, GRect(4,1,14,13));
	}
	
	graphics_context_set_text_color(ctx, GColorWhite);
	graphics_context_set_stroke_color(ctx, GColorWhite);
	
	graphics_draw_text(ctx, "Pokedex", fonts_get_system_font(FONT_KEY_GOTHIC_14), GRect(0,-2,144,16), GTextOverflowModeFill, GTextAlignmentCenter, NULL);
	
	graphics_draw_text(ctx, num_caught_string, fonts_get_system_font(FONT_KEY_GOTHIC_14), GRect(0,-2,144,16), GTextOverflowModeFill, GTextAlignmentRight, NULL);
	
	if(DEBUG == 1) APP_LOG(APP_LOG_LEVEL_DEBUG, "draw fake status bar 4");	
	
	for(int i = 0; i < 144; i++){
		if(i%2 == 0) graphics_draw_pixel(ctx, GPoint(i, 15));
	}
	
	if(DEBUG == 1) APP_LOG(APP_LOG_LEVEL_DEBUG, "draw fake status bar 5");	
}

///////////////////////// INPUT /////////////////////

void up_click_handler(ClickRecognizerRef recognizer, void *context) 
{
	if(trainer_visible) return;
	
	currentID = currentID -1;
	
	app_timer_register(5, transition_timer, NULL); //update_selection();
}

void down_click_handler(ClickRecognizerRef recognizer, void *context) 
{
	if(trainer_visible) return;
	
	currentID = currentID +1;

	app_timer_register(5, transition_timer, NULL);// update_selection();
}

void select_click_handler(ClickRecognizerRef recognizer, void *context) 
{	
	if(trainer_visible) return;
	
	if (mode == MODE_TYPE)
		mode = MODE_DATA;
	else
		mode = MODE_TYPE;
		
	update_selection();
}

void long_select(ClickRecognizerRef recognizer, void *context){
	//send_request(DATA, "9000");
	//persist_delete(POKEDEX_DATA);
	vibes_short_pulse();
	//APP_LOG(APP_LOG_LEVEL_DEBUG, "Long Select");
	if(!trainer_visible){
		time_t now = time(NULL);
		int raw_seconds = difftime(now, start_time);
		int days = raw_seconds / (60*60*24);
		int hours = (raw_seconds - days*60*60*24) / (60*60);
		int mins = (raw_seconds - days*60*60*24 - hours*60*60) / 60;
		snprintf(time_diff, sizeof(time_diff), "%02d:%02d:%02d", days, hours, mins);
		animate_layer(trainer_layer, &GRect(144,27,144,130), &GRect(0,27,144,130), 500, 0);//layer_set_frame(trainer_layer, GRect(0,27,144,130));
	}
	else
		animate_layer(trainer_layer, &GRect(0,27,144,130), &GRect(144,27,144,130), 500, 1);//layer_set_frame(trainer_layer, GRect(144,27,144,130));
	
	trainer_visible = !trainer_visible;
}

void long_up(ClickRecognizerRef recognizer, void *context){
	if(trainer_visible) return;
	
	if(num_caught == 151)
		currentID -= 25;
	else{
		for(int i = currentID; i > 0; i--){
			currentID--;
			if(pokedex[currentID] == 1) break;
	    }
	}
	app_timer_register(5, transition_timer, NULL); //update_selection();
}

void long_down(ClickRecognizerRef recognizer, void *context){
	if(trainer_visible) return;
	
	if(num_caught == 151)
	    currentID += 25;
	else{
		for(int i = currentID; i < 152; i++){
		    currentID++;
		    if(pokedex[currentID] == 1) break;
	    }
	}
	app_timer_register(5, transition_timer, NULL); //update_selection();
}

void click_config_provider(void *context) {
	window_single_click_subscribe(BUTTON_ID_SELECT, select_click_handler);
	window_single_click_subscribe(BUTTON_ID_UP,     up_click_handler);
	window_single_click_subscribe(BUTTON_ID_DOWN,   down_click_handler);
	
	window_long_click_subscribe(BUTTON_ID_UP, 300, long_up, NULL);
	window_long_click_subscribe(BUTTON_ID_DOWN, 300, long_down, NULL);
	window_long_click_subscribe(BUTTON_ID_SELECT, 600, long_select, NULL);
}

void draw_trainer_layer(Layer *layer, GContext *ctx){
	graphics_context_set_fill_color(ctx, GColorWhite);
	graphics_context_set_compositing_mode(ctx, GCompOpSet);
	graphics_fill_rect(ctx, GRect(0,0,144,130), 0, GCornerNone);
	graphics_context_set_text_color(ctx, GColorBlack);
	
	graphics_context_set_stroke_color(ctx, GColorDarkGray);
	graphics_draw_line(ctx, GPoint(0,0), GPoint(144,0));
	graphics_draw_line(ctx, GPoint(0,129), GPoint(144,129));
	
	graphics_draw_bitmap_in_rect(ctx, trainer_image, GRect(4, 38, 29, 50));
	
	graphics_draw_text(ctx, "Pokemon", custom_font, GRect(38, 20, 200, 20), GTextOverflowModeTrailingEllipsis, GTextAlignmentLeft, NULL);
	graphics_draw_text(ctx, num_caught_string, custom_font, GRect(38, 40, 100, 20), GTextOverflowModeTrailingEllipsis, GTextAlignmentLeft, NULL);
	
	graphics_draw_text(ctx, "Time", custom_font, GRect(38, 70, 200, 20), GTextOverflowModeTrailingEllipsis, GTextAlignmentLeft, NULL);
	graphics_draw_text(ctx, time_diff, custom_font, GRect(38, 90, 200, 20), GTextOverflowModeTrailingEllipsis, GTextAlignmentLeft, NULL);
}

///////////////////////// INIT /////////////////////
void handle_init(void) {
	app_message_open(app_message_inbox_size_maximum(), app_message_outbox_size_maximum());
	app_message_register_inbox_received(inbox_received_handler);
	
	custom_font = fonts_load_custom_font(resource_get_handle(RESOURCE_ID_FONT_PKMN_14));
	
	vibes_long_pulse();
	
	if(!persist_exists(START_TIME)){
		time_t now = time(NULL);
		persist_write_int(START_TIME, (int) now);
		start_time = now;
	}
	else{
		start_time = (time_t) persist_read_int(START_TIME);
	}
	
	if(DEBUG == 1) APP_LOG(APP_LOG_LEVEL_DEBUG, "Start Time: %i", (int)start_time);
	
	if(persist_exists(POKEDEX_DATA)){
		persist_read_data(POKEDEX_DATA, array, 19);
		for(int i = 0; i < 152; i++){
			pokedex[i] = ( array[ i / 8 ] >> ( i % 8 ) ) & 1;
			if(pokedex[i] == 1) num_caught++;
		}
	}
	else{
		for(int i = 0; i < 152; i++){
			pokedex[i] = 0;
		}
	}

	int launch = launch_get_args();
	
	if(launch == 0) {
		currentID = 1;
	}
	else{
		recent_catch = launch;
		if(launch < 1000){
			if(pokedex[launch] == 0){
				num_caught++;
				pokedex[launch] = 1;
			}
			currentID = launch;
		}
		else{
			currentID = launch-1000;
		}
	}
	
	snprintf(num_caught_string, sizeof(num_caught_string), "%d/151 ", num_caught);
	
	mode = MODE_TYPE; //Type Mode

	window = window_create();
	window_set_background_color( window, GColorWhite);
		
	#ifdef PBL_PLATFORM_APLITE
		window_set_fullscreen(window, true);
	#endif
	
	window_set_click_config_provider( window, click_config_provider );
	
	/*******  TEXT LAYER ********/
	
	text_layer = text_layer_create( GRect(4, 44+16, 140 /* width */, 98 /* height */));
	
	text_layer_set_font( text_layer, custom_font);
	text_layer_set_text_color( text_layer, GColorBlack);
	text_layer_set_overflow_mode( text_layer, GTextOverflowModeWordWrap);
	text_layer_set_background_color( text_layer, GColorClear);
	text_layer_set_text_alignment( text_layer, GTextAlignmentCenter);
	
	layer_add_child( window_get_root_layer( window ), text_layer_get_layer( text_layer ));
	
	/////// IMAGE ////////////
	poke_image       = gbitmap_create_with_resource( RESOURCE_ID_IMAGE_poke1);
	poke_image_layer = bitmap_layer_create( GRect( 70, 10+16, 58, 58) );
	bitmap_layer_set_alignment( poke_image_layer, GAlignCenter);
	bitmap_layer_set_background_color( poke_image_layer, GColorClear);
	bitmap_layer_set_compositing_mode( poke_image_layer, GCompOpSet);
	bitmap_layer_set_bitmap( poke_image_layer, poke_image);
	layer_add_child( window_get_root_layer( window ), bitmap_layer_get_layer( poke_image_layer ));
	
	/////// UI TOP ////////////
	top_bar_image = gbitmap_create_with_resource( RESOURCE_ID_UI_TOP );
	top_bar_layer = bitmap_layer_create(GRect( 0, 16, 144, 11));
	bitmap_layer_set_bitmap( top_bar_layer, top_bar_image);
	layer_add_child( window_get_root_layer( window ), bitmap_layer_get_layer( top_bar_layer ));
	
	/////// UI BOTTOM ////////////
	bottom_bar_image = gbitmap_create_with_resource( RESOURCE_ID_UI_BOTTOM );
	bottom_bar_layer = bitmap_layer_create( GRect( 0, 168-11, 144, 11) );
	bitmap_layer_set_bitmap( bottom_bar_layer, bottom_bar_image);
	layer_add_child( window_get_root_layer( window ), bitmap_layer_get_layer( bottom_bar_layer ));	
	
	star = gbitmap_create_with_resource( RESOURCE_ID_STAR );
	
	fake_status_bar = layer_create(GRect(0,0,144,16));
	layer_set_update_proc(fake_status_bar, draw_fake_status_bar);
	layer_add_child( window_get_root_layer( window ), fake_status_bar );
	
	transition_layer = layer_create(GRect(0,0,144,168));
	layer_set_update_proc(transition_layer, draw_transition_layer);
	layer_add_child( window_get_root_layer( window ), transition_layer );
	
	/////// TRAINER LAYER ////////////
	trainer_image = gbitmap_create_with_resource( RESOURCE_ID_TRAINER );
	
	trainer_layer = layer_create(GRect(144,11,144,130));
	layer_set_update_proc(trainer_layer, draw_trainer_layer);
	layer_add_child( window_get_root_layer( window ), trainer_layer );
	
	update_selection();
	
	window_stack_push( window, false );
	

	for(int i = 0; i < 152; i++){
		if(pokedex[i] == 1){
			array[ i / 8 ] |= 1 << ( i % 8 );
		}
		else{
			array [ i / 8] &= ~( 1 << ( i % 8 ) );
		}
	}
	persist_write_data(POKEDEX_DATA, array, 19);	
}


///////////////////////// DE INIT /////////////////////

void handle_deinit(void) {
	app_message_deregister_callbacks();
	fonts_unload_custom_font( custom_font );
		
	bitmap_layer_destroy( poke_image_layer );
	bitmap_layer_destroy( top_bar_layer );
	bitmap_layer_destroy( bottom_bar_layer );
	
	gbitmap_destroy( poke_image );
	gbitmap_destroy( top_bar_image );
	gbitmap_destroy( bottom_bar_image );
	gbitmap_destroy( trainer_image );
	gbitmap_destroy( star );
	
	text_layer_destroy( text_layer );

	layer_destroy( fake_status_bar );
	
	layer_destroy( trainer_layer );
	
	layer_destroy( transition_layer );
	
	window_destroy( window );
}

///////////////////////// MAIN /////////////////////
int main(void) {
	  handle_init();
	  app_event_loop();
	  handle_deinit();
}