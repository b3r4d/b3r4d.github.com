//Whats a mob to a King
//The thoughts are thinking them
//Instead of them thinking the thoughts
//Whats a King to a GOD
//Instead of the thoughts thinking me
//I am me thinking the thoughts

    var logo                    = "assets/logo.png";
    var boob1                   = "assets/brownboobs.png";
    var s_pathGrossini          = "assets/grossini.png";
    var ghost                   = "assets/ghost.png";
    var ghost2                  = "assets/ghost2.png";

    var g_ressources = [
    //image
    {type:"image", src:logo             },
    {type:"image", src:boob1            },
{type: "image", src: ghost},
{type: "image", src: ghost2},
    {type:"image", src:s_pathGrossini   }
    //plist

    //fnt

    //tmx

    //bgm
   
    //effect
];

(function () {
    var srcFolder = "src";
    var files = [
   'Title.js',
    'Cosmos.js',
   'Creation.js',
    'Soul.js',
    'Soul2.js',
   'Paradolia.js'
    ];
   
    //added this so canvas takes up the entire screen
    var ctx = canvas = document.getElementById('gameCanvas');
    ctx.width  = window.innerWidth;
    ctx.height = window.innerHeight;
    
    var d = document;
    var c = {
        COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        box2d:false,
        chipmunk:true,
        showFPS:true,
        frameRate:60,
        tag:'gameCanvas', //the dom element to run cocos2d on
        engineDir:'libs/cocos2d/',
        //SingleEngineFile:'',
        appFiles:files
    };
    window.addEventListener('DOMContentLoaded', function () {
        //first load engine file if specified
       
        //Build File List
        var max = files.length;
        var fileList = [];
        for ( var i = 0; i < max; i++)
        {
          fileList.push( srcFolder + "/" + files[i]);      
        }
        
        c.appFiles = fileList;
        
        var s = d.createElement('script');
        /*********Delete this section if you have packed all files into one*******/
        if (c.SingleEngineFile && !c.engineDir) {
            s.src = c.SingleEngineFile;
        }
        else if (c.engineDir && !c.SingleEngineFile) {
            s.src = c.engineDir + 'platform/jsloader.js';
        }
        else {
            alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
        }
        /*********Delete this section if you have packed all files into one*******/
        //s.src = 'Packed_Release_File.js'; //IMPORTANT: Un-comment this line if you have packed all files into one

        d.body.appendChild(s);
        document.ccConfig = c;
        s.id = 'cocos2d-html5';
        
       
        //else if single file specified, load singlefile
    });
})();
