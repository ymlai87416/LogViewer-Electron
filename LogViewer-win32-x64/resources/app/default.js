(function () {
      
    const remote = require('electron').remote; 
    
    function init() { 
      document.getElementById("min-btn").addEventListener("click", function (e) {
        const window = remote.getCurrentWindow();
        window.minimize(); 
      });
      
      document.getElementById("max-btn").addEventListener("click", function (e) {
        const window = remote.getCurrentWindow();
        if (!window.isMaximized()) {
          window.maximize();
        } else {
          window.unmaximize();
        }	 
      });
      
      document.getElementById("close-btn").addEventListener("click", function (e) {
        const window = remote.getCurrentWindow();
        window.close();
      }); 

      document.addEventListener("keydown", function (e) {
        
        if (e.which === 123) {         
          remote.getCurrentWindow().toggleDevTools();
        } else if (e.which === 116) {
          location.reload();
        }
      });

    }; 
    
    document.onreadystatechange = function () {
      if (document.readyState == "complete") {
        init(); 
      }
    };
})();