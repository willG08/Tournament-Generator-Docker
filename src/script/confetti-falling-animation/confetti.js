/*
    Unedited confetti falling code may be found: https://www.cssscript.com/confetti-falling-animation/#google_vignette
    This code was made by the editor at the above website and adjusted for my use here.
    Made in August 2019 for the use of anyone.
*/

function startConfettiInner() {
    // Use the current window dimensions
    var width = '100vw';
    var height = '1425px'; 
    
    // Request animation frame fallback
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                return window.setTimeout(callback, 16.6666667);
            };
    })();

    // Get the canvas element
    var canvas = document.getElementById("confetti-canvas");
    
    // Create the canvas if it doesn't exist
    if (canvas === null) {
        canvas = document.createElement("canvas");
        canvas.setAttribute("id", "confetti-canvas");
        
        // Set the canvas style
        canvas.setAttribute("style", "position:absolute; top:0; left:0; width:100%; height:100%; display:block; z-index:999999; pointer-events:none;");
        
        document.body.appendChild(canvas);
    }

    // Update canvas size on window resize
    window.addEventListener("resize", function() {
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;
		canvas.width = '100vw';
        canvas.height = '1425px';
    }, true);

    var context = canvas.getContext("2d");

    // Initialize particles if fewer than max count
    while (particles.length < maxParticleCount) {
        particles.push(resetParticle({}, width, height));
    }

    streamingConfetti = true;

    // Animation loop
    if (animationTimer === null) {
        (function runAnimation() {
			
            // Clear the canvas using its current dimensions
            context.clearRect(0, 0, canvas.width, canvas.height);
            if (particles.length === 0) {
                animationTimer = null;
            } else {
                updateParticles();
                drawParticles(context);
                animationTimer = requestAnimFrame(runAnimation);
            }
        })();
    }
}
