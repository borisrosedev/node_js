window.onload = function() {
    const ui = SwaggerUIBundle({
      url: "http://localhost:3000/api-docs/swagger.json", // URL de ton propre swagger.json
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      layout: "StandaloneLayout"
    });
    window.ui = ui;
  };
  