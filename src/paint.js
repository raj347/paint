(function(window) {
  var $ = function(selector, c) {
    this.elements = (document.querySelectorAll(selector) || c);
    this.length = this.elements.length;
  };

  $.fn = $.prototype = {
    ready: function(callback) {
      document.addEventListener("DOMContentLoaded", callback);
    },

    each: function(callback) {
      for (var i = 0; i < this.length; i++) {
        callback(this.elements[i], i, this.elements);
      }
      return this;
    },

    // attr: function(name, val) {
    //   if (val) {
    //     this.each(function() {
    //       this.setAttribute(name, val);
    //     });
    //   } else if (!val) {
    //     return this.getAttribute(name);
    //   }
    //   return this;
    // },

    addClass: function(className) {
      this.each(function(element) {
        element.classList.add(className);
      });
      return this;
    },

    removeClass: function(className) {
      this.each(function(element) {
        element.classList.remove(className);
      });

      return this;
    },
    
    hasClass: function(className) {
      this.each(function() {
        this.classList ? this.classList.contains(className) : new RegExp('(^| )' + className + '( |$)', 'gi').test(this.className);
      });
      return this;
    },
    toggleClass: function(className) {
      this.each(function() {
        if (this.classList) {
            this.classList.toggle(className);
        } else {
          var classes = this.className.split(' ');
          var existingIndex = classes.indexOf(className);
          if (existingIndex >= 0)
            classes.splice(existingIndex, 1);
          else
            classes.push(className);
            this.className = classes.join(' ');
        }
      });
    },
    
    val: function (val) {
      if (val) {
        this.each(function () {
          this.value = val;
        });
      } else {
        return this.elements[0].value;
      }
    },
    
    html: function(html) {
      if(html) {
        this.each(function() {
          this.innerHTML = html;
        });
      } else {
        return this.elements[0].innerHTML || '';
      }
      
      return this;
    },
    
    hide: function() {
      this.each(function() {
        this.style.display = 'none';
      });

      return this;
    },
    show: function() {
      this.each(function() {
        this.style.display = '';
      });

      return this;
    },
    toggle: function() {
      this.each(function() {
        this.style.display = '' ? this.style.display = 'none' : this.style.display = '';
      });
      
      return this;
    },
    
    css: function(rule, attr) {
      if(rule) {
        this.each(function() {
          this.style[rule] = attr;
        });
      } else if(!attr) {
        return getComputedStyle(this)[rule];
      }
      return this;
    },
    
    on: function(event, cb) {
      this.each(function() {
        this.addEventListener(event, cb);
      });
      return this;
    },
    
    off: function(event, cb) {
      this.each(function() {
          this.removeEventListener(event, cb);
      });
      return this;
    },
    
    click: function(cb) {
      this.on('click', cb);
      return this;
    }
  };

  window.$ = function(selector, context) {
    return new $(selector, context);
  };
})(window);