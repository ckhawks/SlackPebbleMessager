#include <pebble.h>
#include <string.h>


static Window *window;
static TextLayer *text_layer;
AppTimer *timer;
int messageIdentifier;

void updateIdentifier(){

  switch(messageIdentifier){
    case 1:
      text_layer_set_text(text_layer, "Hi, I'm a bot!");
    break;
    case 2:
      text_layer_set_text(text_layer, "Case 2 UNBOUND");
    break;
    case 3:
      text_layer_set_text(text_layer, "Running Late");
    break;
  }
  
}

static void updateSent(){
  text_layer_set_text(text_layer, "Sent message!");
  timer = app_timer_register(100, updateIdentifier, NULL);
}

static void select_click_handler(ClickRecognizerRef recognizer, void *context) {
  text_layer_set_text(text_layer, "Send Message");
  
  DictionaryIterator *iter;
  app_message_outbox_begin(&iter);

  if (iter == NULL) {
    return;
  }

  dict_write_uint16(iter, 200, messageIdentifier); // 200 and mtype are indentifiers, 1(messageIdentifier) is value.
  dict_write_end(iter);

  app_message_outbox_send();
    
  updateSent();
}

static void up_click_handler(ClickRecognizerRef recognizer, void *context) {
  text_layer_set_text(text_layer, "Up");
  
  messageIdentifier++;

  
  updateIdentifier();
}

static void down_click_handler(ClickRecognizerRef recognizer, void *context) {
  text_layer_set_text(text_layer, "Down");
  
  messageIdentifier--;
  
  updateIdentifier();
}

static void click_config_provider(void *context) {
  window_single_click_subscribe(BUTTON_ID_SELECT, select_click_handler);
  window_single_click_subscribe(BUTTON_ID_UP, up_click_handler);
  window_single_click_subscribe(BUTTON_ID_DOWN, down_click_handler);
}

static void window_load(Window *window) {
  Layer *window_layer = window_get_root_layer(window);
  GRect bounds = layer_get_bounds(window_layer);

  text_layer = text_layer_create((GRect) { .origin = { 0, 72 }, .size = { bounds.size.w, 20 } });
  text_layer_set_text(text_layer, "Press a button");
  text_layer_set_text_alignment(text_layer, GTextAlignmentCenter);
  layer_add_child(window_layer, text_layer_get_layer(text_layer));
}

static void window_unload(Window *window) {
  text_layer_destroy(text_layer);
}

static void init(void) {
  app_message_open(512, 512);
  window = window_create();
  window_set_click_config_provider(window, click_config_provider);
  window_set_window_handlers(window, (WindowHandlers) {
	.load = window_load,
    .unload = window_unload,
  });
  const bool animated = true;
  
  messageIdentifier = 1;
  
  window_stack_push(window, animated);
  
  
}

static void deinit(void) {
  window_destroy(window);
}

int main(void) {
  init();
  app_event_loop();
  deinit();
}