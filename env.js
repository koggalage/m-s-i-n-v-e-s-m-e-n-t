(function (window) {
    window.__env 				= window.__env || {};
  window.__env.apiUrl 		= 'http://{0}test.localhost:8080';
    window.__env.baseUrl 		= '/';
    window.__env.enableDebug 	= true;

  window.__env.format = function (source, params) {
      $.each(params, function (i, n) {
          source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
      });

      return source;
  }

  window.__env.ApiPath = function (subdomain, urlPath) {
      var newUrl = this.format(this.apiUrl, [subdomain === '' ? subdomain : subdomain + '.']);

      return newUrl + urlPath;
  }

}(this));