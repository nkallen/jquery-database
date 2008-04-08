(function($) {
  $.extend(jQuery.expr[":"], {
    eq    : function(a, i, m) {
      if (!isNaN(Number(m[3]))) {
        return jQuery(a).text() == m[3];
      } else
        return jQuery(a).text() == jQuery(a).siblings(m[3]).text();
    }
  });
  $.fn.where = function(condition) {
    return this.find('tr:has(' + condition + ')').filter('tr');
  };
  $.fn.and = function(condition) {
    return this.filter(':has(' + condition + ')');
  };
  $.fn.select = function(attributes) {
    return this
      .map(function() {
        return $(this).find(attributes)
          .map(function() { return $(this).text() });
      });
  };
  $.fn.join = function(other) {
    var left = this, right = $(other);
    var table = $('<table>')
    this
      .find('tr').each(function() {
        var left_row = $(this);
        $(other).find('tr').each(function() {
          $(this)
            .clone()
              .find('td')
              .each(function() {
                $(this).addClass(right.attr('class'));
              })
              .end()
            .append(
              left_row
                .clone()
                .find('td')
                .each(function() {
                  $(this).addClass(left.attr('class'));
                })
            )
            .appendTo(table);
        });
      });
    return table;
  };
})(jQuery);