/*!
 * WP Googel Analytics Events | v1.0
 * Copyright (c) 2013 Yuval Oren (@yuvalo)
 * License: GPLv2
 */

/*jslint indent: 4 */
/*global $, jQuery, document, window, _gaq*/

var scroll_events = (function ($) {
    "use strict";

    var scroll_elements  = [];
    var click_elements = [];
    var universal = 0;
		var ga_element;

    var track_event = function (category, action, label, universal) {
        var event_category = !category ? '' : category;
        var event_action = !action ? '' : action;
        var event_label = !label ? '' : label;
        if (typeof ga_element === "undefined") {
           if (typeof ga !== 'undefined') {
                ga_element = ga;
            } else if (typeof _gaq !== 'undefined') {
                ga_element = _gaq;
            } else if (typeof __gaTracker === "function") {
                        ga_element = __gaTracker;
                }
        }
				if (universal) {
          ga_element('send','event', category, action, label);
        } else {
          ga_element.push(['_trackEvent',category, action, label]);
        }

    };

    var click_event = function (event) {
      track_event(event.data.category, event.data.action, event.data.label, event.data.universal);

      if (event.currentTarget.hasOwnProperty('href')) {
        event.preventDefault();
        setTimeout(function () {
          window.location = event.currentTarget.href;
        }, 100);
      }
    };

    return {
        bind_events : function (settings) {
            scroll_elements = settings.scroll_elements;
            click_elements = settings.click_elements;
            universal = settings.universal;
            var i;
            for (i = 0; i < click_elements.length; i++) {
                var clicked = click_elements[i];
                clicked.universal = universal;
                $(clicked.select).on('click', clicked, click_event);
            }



            $(window).scroll(function () {
                var ga_window = $(window).height();
                var ga_scroll_top = $(document).scrollTop();
                var i;
                for (i = 0; i < scroll_elements.length; i++) {
                    if (!scroll_elements[i].sent) {
                        scroll_elements[i].offset =  $(scroll_elements[i].select).offset();
                        if (scroll_elements[i].offset && ga_scroll_top + ga_window >= scroll_elements[i].offset.top + $(scroll_elements[i].select).height()) {
                            track_event(scroll_elements[i].category, scroll_elements[i].action, scroll_elements[i].label, universal);
                            scroll_elements[i].sent = true;
                        }
                    }
                }
            });
        }
    };

}(jQuery));
