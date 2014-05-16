// Generated by CoffeeScript 1.6.3
(function() {
  var $;

  $ = this.jQuery;

  $.fn.extend({
    confirmWithReveal: function(options) {
      var confirm_handler, defaults, do_confirm, fallback_confirm, settings, _ref, _ref1;
      if (options == null) {
        options = {};
      }
      defaults = {
      	modal_id: 'default',
        modal_class: 'medium',
        title: 'Are you sure?',
        title_class: '',
        body: 'This action cannot be undone.',
        body_class: '',
        password: false,
        prompt: 'Type <strong>%s</strong> to continue:',
        footer_class: '',
        ok: 'Confirm',
        ok_class: 'button alert',
        cancel: 'Cancel',
        cancel_class: 'button secondary',
        ok_callback_function: false,
        cancel_callback_function: false
      };
            
      settings = $.extend({}, defaults, options);

      do_confirm = function($el) {
        var confirm_button, confirm_html, confirm_label, el_options, modal, option, password;
        el_options = $el.data('confirm');
        if (el_options == null) {
          el_options = {};
        }
        if ((typeof el_options === 'string') && (el_options.length > 0)) {
          return fallback_confirm.call(window, el_options);
        }
        option = function(name) {
          return el_options[name] || settings[name];
        };
        
        var cancel_callback_function = function(e) {
  	    	jQuery("#"+ option('modal_id') +"Dialog").foundation('reveal', 'close');
  	    	return $el.trigger('cancel.reveal', e);
  	    };

        var ok_callback_function = function(e) {
          if ($(this).prop('disabled')) {
            return false;
          }
          $el.trigger('confirm.reveal', e);
          if ($el.is('form, :input')) {
            return $el.closest('form').removeAttr('data-confirm').submit();
          }
        };
	      
  	    if (option('modal_id') != "default") {
  	    	ok_callback_function = option('ok_callback_function');
          cancel_callback_function = option('cancel_callback_function');
  	    }
	      
        modal = $("<div data-reveal id='" + (option('modal_id')) + "Dialog' class='reveal-modal " + (option('modal_class')) + "'>\n  <h2 data-confirm-title class='" + (option('title_class')) + "'></h2>\n  <p data-confirm-body class='" + (option('body_class')) + "'></p>\n  <div data-confirm-footer class='" + (option('footer_class')) + "'>\n    <a data-confirm-cancel class='" + (option('cancel_class')) + "'></a>\n  </div>\n</div>");
        confirm_button = $el.is('a') ? $el.clone() : $('<a/>');
        confirm_button.removeAttr('data-confirm').attr('class', option('ok_class')).html(option('ok')).on('click', ok_callback_function);
        modal.find('[data-confirm-title]').html(option('title'));
        modal.find('[data-confirm-body]').html(option('body'));
        modal.find('[data-confirm-cancel]').html(option('cancel')).on('click', cancel_callback_function);
        modal.find('[data-confirm-footer]').append(confirm_button);
        if ((password = option('password'))) {
          confirm_label = (option('prompt')).replace('%s', password);
          confirm_html = "<label>\n  " + confirm_label + "\n  <input data-confirm-password type='text'/>\n</label>";
          modal.find('[data-confirm-body]').after($(confirm_html));
          modal.find('[data-confirm-password]').on('keyup', function(e) {
            var disabled;
            disabled = $(this).val() !== password;
            return confirm_button.toggleClass('disabled', disabled).prop('disabled', disabled);
          }).trigger('keyup');
        }
        modal.appendTo($('body')).foundation().foundation('reveal', 'open').on('closed.fndtn.reveal', function(e) {
          return modal.remove();
        });
        return false;
      };
      confirm_handler = function(e) {
        if (!(do_confirm($(this)))) {
          e.preventDefault();
          return e.stopImmediatePropagation();
        }
      };
      fallback_confirm = ((_ref = $.rails) != null ? _ref.confirm : void 0) ? $.rails.confirm : window.confirm;
      if ((_ref1 = $.rails) != null ? _ref1.allowAction : void 0) {
        $.rails.allowAction = function(link) {
          return do_confirm($(link));
        };
      }
      return this.each(function() {
        var $el;
        $el = $(this);
        $el.on('click', 'a[data-confirm], :input[data-confirm]', confirm_handler);
        $el.on('submit', 'form[data-confirm]', confirm_handler);
        return $el;
      });
    }
  });

}).call(this);
