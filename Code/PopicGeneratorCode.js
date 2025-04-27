//Parameter you can change freely

// DOM Elements
let editor;
let templateSelector;
let rendered;
let rawCode;
let contextMenu;
let contextMenu_ConvertToParm;
let contextMenu_SaveImage;

// State Variables
let currentTemplate = "";
let values = {};
let repeatComponentSaving = []; // Stores component repeat counts

//Template definitions
// const templates = [
//     {
//         name: "Feature Showcase",
//         component: [
//             {
//                 name: "Main",
//                 html: "<style> .allCards { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; } .allCards .Card { flex: 1; min-width: ${Card min width:text->250px}; max-width: ${Card max width:text->350px}; border-radius: ${Card border radius:text->10px}; overflow: hidden; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); background-color: #ffffff; } .feature-header { --cardColor:#3498db; height: 150px; background-color: var(--cardColor); display: flex; justify-content: center; align-items: center; overflow: hidden; position: relative; } .feature-content { padding: 20px; } .Card:hover { transform: translateY(-15px); box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2); } .feature-icon{ --IconColor:#00000; font-size: ${Icon size:text->40px}; color:var(--IconColor); } </style> <div class='allCards'> ${Card:component} </div>"
//             },
//             {
//                 name: "Card",
//                 html: "<div class='Card'> <div class='feature-card'> <div class='feature-header' style='--cardColor:${Color card:color->#3498db}'> <div class='feature-icon' style='--IconColor: ${Icon color:color->#00000}'>${Icon card:text->★}</div> </div> <div class='feature-content'> <h3 class='feature-title'>${Title card:text->Amazing Feature}</h3> <p class='feature-description'>${Description card:text->This feature provides incredible value to your users.}</p> </div> </div> </div>"
//             }
//         ]
//     },
//     {
//         name: "Iframe with Multi Buttons",
//         component:[
//         {                             
//             name: "Main",
//             html:"<div style='margin: 0px auto; max-width: 1000px; text-align: justify;'> <div style='position:relative; width:100%; height:0px; padding-bottom:56.25%;'> <iframe style='position:absolute;left:0;top:0;width:100%;height:100%;border-radius: ${Iframe border radius:text->8px};' src='${IframeUrl:text->//www.youtube.com/embed/XbLemOwzdxk?si=BV1G12zoN_WzgLFT}' frameborder='0' allowfullscreen=''></iframe> </div> <div style='display: flex; justify-content: center; gap: 1em 3em; flex-wrap: wrap; text-align: center; width: min(70%, 25em); margin: auto; margin-top: 0.6em;'> ${Button:component} </div> </div>"
//         },
//         {
//             name:"Button",
//             html:"<a onmouseover=\"this.style.backgroundColor='${Hover button back color:color->#f5be29}';this.style.color='${Hover button color:color->#000000}'; \" onmouseout=\"this.style.backgroundColor='${Button back color:color->#000000}';this.style.color='${Button color:color->#ffffff}'; \"  onfocus=\"this.style.backgroundColor='${Hover button back color:color->#f5be29}';this.style.color='${Hover button color:color->#000000}'; \" onfocusout=\"this.style.backgroundColor='${Button back color:color->#000000}';this.style.color='${Button color:color->#ffffff}'; \" style='font-size: large; background-color: ${Button back color:color->#ede6d6}; padding: 0.4em 0.2em; border-radius: 5px; flex-grow: 1; box-shadow: none; text-decoration: none; color:${Button color:color->#000000}' href='${Button url:text}' target='_blank'><span style='font-size: large;'>${Button text:text->Link title}</span></a>"
//         }
//     ]
//     },
//     {
//       "name": "List",
//       "component": [
//         {
//           "name": "Main",
//           "html": "<ol>\n${list:component}\n</ol>"
//         },
//         {
//           "name": "list",
//           "html": "<li style=\"color:${popic:color}\">${popic:color}</li>"
//         }
//       ]
//     },
//     {
//       "name": "Table",
//       "component": [
//         {
//           "name": "Main",
//           "html": "<table>\n <tr>\n      <th scope=\"col\">Name</th>\n      <th scope=\"col\">Age</th>\n      <th scope=\"col\">Favorite Color</th>\n    </tr>\n${Row:component}\n</table>"
//         },
//         {
//           "name": "Row",
//           "html": "    <tr>\n      <td scope=\"row\">${Name:text->newName}</th>\n      <td>${Age:number->00}</td>\n      <td style=\"background:${Favorite color:color}\">${Favorite color:color->#ffffff}</td>\n    </tr>"
//         }
//       ]
//     }
// ];
let Examples = [
  {
    "name": "Simple Example",
    "component": [
      {
        "name": "Main",
        "html": "<!--עיצוב הסמלים שיש ברשימה-->\n<style>\n@counter-style repeating-emoji {\nsystem: cyclic;\n  symbols: ${List icons:text->🤣 😋 😜 🥳}; \n}\n</style>\n\n<!--רשימה שמכילה הקומפוננטה-->\n<ul style=\"list-style-type: repeating-emoji;\">\n${Row:component}\n</ul>\n"
      },
      {
        "name": "Row",
        "html": "<li style='color:${popic:color}'>${popic:color}</li>"
      }
    ]
  },
  {
    "name": "Moodle - Iframe with Multi Buttons",
    "component": [
      {
        "name": "Main",
        "html": "<div style='margin: 0px auto; max-width: 1000px; text-align: justify;'>\n\n${Video:component}\n\n<!--This is the button section-->\n<div style='display: flex; justify-content: center; gap: 1em 3em; flex-wrap: wrap; text-align: center; width: min(70%, 25em); margin: auto; margin-top: 0.6em;'>\n\n${Button:component}\n\n</div>\n\n</div>"
      },
      {
        "name": "Button",
        "html": "<!--Link with inline JS-->\n<a onmouseover=\"this.style.backgroundColor='${Hover button back color:color->#dbd1bc}';this.style.color='${Hover button color:color->#000000}'; \" onmouseout=\"this.style.backgroundColor='${Button back color:color->#ede6d6}';this.style.color='${Button color:color->#000000}'; \" style='font-size: large; background-color: ${Button back color:color->#ede6d6}; padding: 0.4em 0.2em; border-radius: 5px; flex-grow: 1; box-shadow: none; text-decoration: none; color:${Button color:color->#000000}' href='${Button url:text}' target='_blank'>\n\n<span style='font-size: large;'>\n${Button text:text->כפתור 1}\n</span>\n\n</a>"
      },
      {
        "name": "Video",
        "html": "<div style='position:relative; width:100%; height:0px; padding-bottom:${Iframe height:text->56.25%};'>\n\n<iframe style='position:absolute; left:0; top:0; width:100%; height:100%; border-radius: ${Iframe border radius:text->8px};' src='https://tau.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=${IframeId:text->5132c0e3-ac84-4263-86f5-b1b500ba9867}' frameborder='0' allowfullscreen=''></iframe>\n\n</div>"
      }
    ]
  },
  {
    "name": "Drupal - Image Galary",
    "component": [
      {
        "name": "Main",
        "html": "<!--גלריה מלאה מחולקת לשלוש עמודות-->\n<div style='display:grid; gap:10px; grid-template-columns:1fr 1fr 1fr;'>\n\n<!--עמודה ראשונה-->\n<div style='display:flex; flex-direction:column; gap:10px'>\n${Single Image Right:component}\n</div> \n\n<!--עמודה שנייה-->\n<div style='display:flex; flex-direction:column; gap:10px'>\n${Single Image Center:component}\n</div>\n\n<!--עמודה שלישית-->\n<div style='display:flex; flex-direction:column; gap:10px'>\n${Single Image Left:component}\n</div>\n\n</div>"
      },
      {
        "name": "Single Image Right",
        "html": "<!--קישור להגדלת תמונה-->\n<a href='https://tauonlinecourses.github.io/ImageViewer/?img=${Right image url:text->//picsum.photos/id/167/600/400}' target='_blank' title='${Right link title:text->פתח בחלון חדש}' aria-label='${Right link title:text->פתח בחלון חדש}'>\n\n<!--תמונה-->\n<img alt='${Right image alt:text}' src='${Right image url:text}' style='height:auto; width:100%'>\n\n</a>"
      },
      {
        "name": "Single Image Center",
        "html": "<!--קישור להגדלת תמונה-->\n<a href='https://tauonlinecourses.github.io/ImageViewer/?img=${Center image url:text->//picsum.photos/id/88/400/800}' target='_blank' title='${Center link title:text->פתח בחלון חדש}' aria-label='${Center link title:text->פתח בחלון חדש}'>\n\n<!--תמונה-->\n<img alt='${Center image alt:text}' src='${Center image url:text}' style='height:auto; width:100%'>\n\n</a>"
      },
      {
        "name": "Single Image Left",
        "html": "<!--קישור להגדלת תמונה-->\n<a href='https://tauonlinecourses.github.io/ImageViewer/?img=${Left image url:text->//picsum.photos/id/666/600}' target='_blank' title='${Left link title:text->פתח בחלון חדש}' aria-label='${Left link title:text->פתח בחלון חדש}'>\n\n<!--תמונה-->\n<img alt='${Left image alt:text}' src='${Left image url:text}' style='height:auto; width:100%'>\n\n</a>"
      }
    ]
  },
  {
    name: "Drupal - Before and After tab buttons",
    component: [

      {
        name: "Grid column",
        html: "<div style='display:flex; justify-content:space-between; margin-top:5em'> <!-- כפתור חזור לטאב קודם --> <div style='align-items:center; display:flex; gap:0.5em' title='עבור לטאב הקודם'><a href='/${Page URL title:text->TeachingInWar}/?tab=${Tab number-Before:text->0}' target='_self' title='עבור לטאב הקודם'><img alt='עבור לטאב הקודם' src='https://innovative-learning.tau.ac.il/sites/innovative-learning.tau.ac.il/files/media_server/innovative-learning/%D7%94%D7%95%D7%A8%D7%90%D7%94%20%D7%91%D7%A2%D7%AA%20%D7%9E%D7%9C%D7%97%D7%9E%D7%94/BackArrow.png' style='height:25px; opacity:60%; width:14px' /></a> <span style='color:black; font-family:Tahoma,Geneva,sans-serif'> <a href='/${Page URL title:text->TeachingInWar}/?tab=${Tab number-Before:text->0}' style='color: black; text-decoration: none; position: relative; bottom: 2px; border: solid 3px #63d6f5; border-radius: 100px; display: inline-block; padding: 3px 5px; width: 131px; text-align: center; height: calc(2em + 10px); display: grid; align-items: center;' target='_self' title='עבור לטאב הקודם'>טאב קודם</a></span> </div> <!-- כפתור עבור לטאב הבא --> <div style='align-items:center; display:flex; gap:0.5em' title='עבור לטאב הבא'><span style='color:black; font-family:Tahoma,Geneva,sans-serif'><a href='/${Page URL title:text->TeachingInWar}/?tab=${Tab number-After:text->2}' style='color: black; text-decoration: none; position: relative; bottom: 2px; border: solid 3px #63d6f5; border-radius: 100px; display: inline-block; padding: 3px 5px; width: 131px; text-align: center;height: calc(2em + 10px); display: grid; align-items: center;' target='_self' title='עבור לטאב הבא'>טאב הבא</a></span> <a href='/${Page URL title:text->TeachingInWar}/?tab=${Tab number-After:text->2}' target='_self' title='עבור לטאב הבא'><img alt='עבור לטאב הבא' src='https://innovative-learning.tau.ac.il/sites/innovative-learning.tau.ac.il/files/media_server/innovative-learning/%D7%94%D7%95%D7%A8%D7%90%D7%94%20%D7%91%D7%A2%D7%AA%20%D7%9E%D7%9C%D7%97%D7%9E%D7%94/NextBackArrow.png' style='height:25px; opacity:60%; width:14px' /> </a> </div> </div>"
      }

    ]
  },
  {
    "name": "png test",
    "component": [
      {
        "name": "Main",
        "html": "<style>\n@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');\n\nbody{\nmargin:0;\npadding:0;\nheight:400px;\nwidth:400px;\nfont-family: \"Rubik\", sans-serif;\n}\n\nbody>div{\nbackground:red;\nwidth:100%;\nheight:100%;\ndisplay:flex;\nalign-items: center;\njustify-content: center;\n}\n</style>\n\n<div>\n<h1>\n${Text:text->popic}\n</h1>\n</div>"
      }
    ]
  },
  {
    "name": "Image another web",
    "component": [
      {
        "name": "Main",
        "html": "<style>\n\n#image{\n    background-image:url(${Back Image:file});\n}\n\n  ${Global Style:component}\n</style>\n\n<div id=\"image\">\n  ${Effect Layer:component}\n  ${BlurTop:component}\n  ${BlurBottom:component}\n  ${Center Image:component}\n</div>\n"
      },
      {
        "name": "Center Image",
        "html": "<div class=\"centerImage\" >\n<span>${Center text:text->לחצו לקריאה}</span>\n\n<img src=\"data:image/png;base64,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zoiIiIgYJZ1tHiRwRkRERMQo6mT1meAZEREREaNozFefCZwRERERMcrGdPWZ4BkRERERo2zMVp8JnBERERExHozJ6jPBMyIiIiLGgx1efVb0bfvDiIiIiIhRtEOrz6w6IyIiImI82aHVZ9sfRERERESMsu2CVWdEREREjEfblbph+0OIiIiIiFG3zakbbBRERERExHi2TavPpGwgIiIiYjzbptVn2x9ARERERIwnWwWrzoiIiIiIrUzdIHhGRERERGxl6obtP0REREREjEePClU2EBERERH/61FTN0jZQERERET8r0dN3dD/afuPEBERERHj0aMGz7b/ABERERExnrVCygYiIiIi4p+15j0TPCMiIiIi/llr6gb5zoiIiIiIf9YaPNv+RUREREREPAzqOyMiIiIiHtn/yXsmeEZEREREPLL/EzyzWRARERER8cj+T94zwTMiIiIi4pEleEZEREREbIN/QJk6RERERMSj+wcEz4iIiIiIR/ePTYO2/xMREREREf8rwTMiIiIiYivVPsHfsP2fiIiIiIj4X38LnmmQgoiIiIh4bH8rV0fwjIiIiIh4bH8LnqnxjIiIiIh4bAmeERERERFbKcEzIiIiImIbpEEKIiIiImIrJXhGRERERGyl1n+IiIiIiIh/1voPERERERHxz5K2gYiIiIjYSgmeERERERFbKcEzIiIiImIrpc4zIiIiImIrJXhGRERERGyFytj4f6Na/ANERERERLRL8IyIiIiI2EoJnhERERERW6nSnX/D9n8iIiIiIuJ/JXhGRERERGylfwTP1HpGRERERDy6Snf+DYJnRERERMSjS/CMiIiIiNhK/4BGKYiIiIiIR/cPCJ4REREREY/sbzWem6HWMyIiIiLikf2j0oYgeEZEREREPLIEz4iIiIiIrfSPShvN2P4lRERERES0QLk6RERERMQ/+z+bBZuh4gYiIiIi4p/9n3znZsh7RkRERET8s3/Kd27G9i8jIiIiIsazR4S8Z0RERETE/2pN2WiG1A1ERERExP9K8IyIiIiI2EqPCakbiIiIiIi/e0wInhERERERj5Gy0QypG4iIiIiIRylRdzisPiMiIiJivNtqWH1GRERExHi2VSkbzRA8IyIiImI822ZI3UBERETEeLRNq87NsPqMiIiIiPFou4JnweozIiIiIsab7UZRt+0PIiIiIiJG0XavOjdj+6OIiIiIiFG0w5C6gYiIiIjxYIdXnQUbBxERERExHowZrD4jIiIiYpSNyapzM6w+IyIiImKUjTmsPiMiIiJiFI3pqnMzrD4jIiIiYhR1BnWfERERETFKOll1boltUERERETEMOoc0jcQERERMQo6X3Vuhs2DiIiIiBhmPQucBavPiIiIiBhmFc96CpsHERERETGMerrq3BLSNxARERExTCp+9Q3SNxARERExTHqernE4pG8gIiIiYhj0LV3jcEjfQERERMQgG5jAWZC+gYiIiIhBNnAQQCMiIiJiEA3UqnNLyH9GRERExCAZ2MC5GfKfERERETEIBj5wboYAGhERERH91Nd6zm2F/GdERERE9NPQQQCNiIiIiH7oeyOU9kIAjYiIiIheGpo85yNBBQ5ERERE9MLQB87NEEAjIiIioksjEzg3QwCNiIiIiC6MXODcDAE0IiIiIsbSyAbOzRBAIyIiImIsjHzg3AwBNCIiIiJ2xNCWo2svlLFDRERExPYYd4FzS2jljYiIiIitMVQtt11CGgciIiIiHk0C58MggEZEREREm3GzMbCtEEAjIiIiYkvjOr+5tRBEIyIiIsa3StMgcG4DBNCIiIiI8SlpGu1EvzaoxoGIiIgYH7LaHCNYhUZERESMtqw2xxj9CiGIRkRERIyWrDY7hgAaERERMfwSNHsMQTQiIiJiOCVFw0cIohERERHDIavNAYIgGhERETGYEjQHGIJoRERExGBI0BwiCKIRERER/ZGc5hCjD49AGhEREdGtrDJHEIJoRERExNipgFnxFUFzxNEHTCCNiIiI2HYVMLPKHOcokNZFYLtAEBEREePd5mCZgBn+RPOqNME0IiIixquKg0jHgHbRHEwTUCMiImLUVGzTMlAmWAZnNF9gzYF1c3DdrO0CRURERPTKlnGJbBkgEyS3i//3//4/zYYFLoX0zaQAAAAASUVORK5CYII=\">\n</div>"
      },
      {
        "name": "Effect Layer",
        "html": "<div style=\"\nposition: absolute;\nwidth: 100%;\nheight: 100%;\nbackdrop-filter: ${Effect:text->blur(2px)};\n\"></div>"
      },
      {
        "name": "Global Style",
        "html": "#image{\n    width:${Image width:text->1000px};\n    height:${Image height:text->566px};\n    position:relative;\n    background-size: cover;\n    background-position: center;\n}\n\n.centerImage{\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    height: 30%;\n}\n\n.centerImage img{\nheight:100%;\n}\n\n.centerImage span{\n    position: absolute;\n    bottom: 5%;\n    text-align: center;\n    width: 100%;\n    color: white;\n    font-weight: 600;\n    font-size: 24px;\n}\n\nbody{\n    margin: 0;\n    padding: 0;\n    width:${Image width:text};\n    height:${Image height:text};\n    font-family: Arial, sans-serif;\n}\n\n.gradient{\n    background-size: cover;\nposition: absolute;\nwidth: 100%;\n}"
      },
      {
        "name": "BlurTop",
        "html": "<div class=\"gradient\" style=\"\nheight: ${Blur top height:text->100px};\n\nbackground-image:linear-gradient(180deg,\n${Start color top:color-> #000000}${Start color top opacity:text->ff} 0%,\n${End color top:color-> #000000}${End color top opacity:text->00}  100%);\n\nbottom:auto;\ntop:0;\n\">\n\n</div>"
      },
      {
        "name": "BlurBottom",
        "html": "<div class=\"gradient\" style=\"\nheight: ${Blur bottom height:text->100px};\n\n\nbackground-image: linear-gradient(180deg,\n${Start color bottom :color-> #000000}${Start color bottom opacity:text->00} 0%,\n${End color bottom :color-> #000000}${End color bottom opacity:text->ff}  100%);\n\nbottom:0;\ntop:auto;\n\">\n\n</div>"
      }
    ]
  },
  {
    "name": "Feature Showcase",
    "component": [
      {
        "name": "Main",
        "html": "<style>\n\n.allCards{\ndisplay: flex;\nflex-wrap: wrap;\ngap: 20px;\njustify-content: center;\n}\n\n.allCards .Card{\nflex: 1; min-width: ${Card min width:text->250px}; max-width: ${Card max width:text->350px};\nborder-radius: ${Card border radius:text->10px};\noverflow: hidden;\nbox-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\ntransition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); background-color: #ffffff; } \n\n.feature-header{\n--cardColor:#3498db;\nheight: 150px; \nbackground-color: var(--cardColor);\ndisplay: flex;\njustify-content: center;\nalign-items: center;\noverflow: hidden;\nposition: relative;\n}\n\n.feature-content { padding: 20px; }\n\n.Card:hover {\ntransform: translateY(-15px);\nbox-shadow: 0 15px 30px rgba(0, 0, 0, 0.2); } \n\n.feature-icon{\n--IconColor:#00000;\nfont-size: ${Icon size:text->40px};\ncolor:var(--IconColor);\n}\n\n</style>\n\n<div class='allCards'>\n${Card:component}\n</div>"
      },
      {
        "name": "Card",
        "html": "<div class='Card'>\n\n<div class='feature-card'>\n\n<div class='feature-header' style='--cardColor:${Color card:color->#3498db}'>\n<div class='feature-icon' style='--IconColor: ${Icon color:color->#00000}'>${Icon card:text->★}\n</div>\n</div>\n\n<div class='feature-content'> \n\n<h3 class='feature-title'>${Title card:text->Amazing Feature}</h3>\n\n<p class='feature-description'>${Description card:text->This feature provides incredible value to your users.}\n</p>\n\n</div>\n</div>\n\n</div>"
      }
    ]
  }
]

let templates = [

];


/**
 * Initialize the application
 */
function start() {
  // Get DOM elements
  initializeElements();

  // Setup event listeners
  templateSelector.addEventListener('change', () => {
    toggleCustomTemplateEditor();
  });

  // Initialize the context menu for copy/paste functionality
  initializeContextMenu();

  // Populate templates and generate initial editor
  populateTemplates();
  updateTempletByUrl();
  // generateEditor();
  jsonHandler();

  toggleCustomTemplateEditor();
}

/**
 * Initialize DOM element references
 */
function initializeElements() {
  editor = document.getElementById('editor');
  templateSelector = document.getElementById('templateSelector');
  rendered = document.getElementById('rendered');
  rawCode = document.getElementById('rawCode');
  contextMenu = document.getElementById("contextMenu");
  contextMenu_ConvertToParm = document.getElementById("contextMenuConvertTextToParm");
  contextMenu_SaveImage = document.getElementById("contextMenuSaveImage");
}

/**
 * Populate the template selector dropdown with available templates
 */
function populateTemplates() {
  templateSelector.innerHTML = "";
  templates.forEach((template, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.innerText = template.name;
    templateSelector.appendChild(option);
  });

  const customOption = document.createElement("option");
  customOption.value = "custom";
  customOption.innerText = "Other (Create Your Own)";
  templateSelector.appendChild(customOption);
}

function toggleCustomTemplateEditor() {
  const selected = templateSelector.value;
  console.log(selected);
  const isCustom = selected === "custom";
  editor.innerHTML = "";

  if (isCustom) {
    generateCustom();
  } else {
    generateEditor();
  }
}

function generateCustom(templateBase) {
  editor.innerHTML = "";

  const container = document.createElement("div");
  container.id = "customTemplateBuilder";

  if (templateBase) {
    const BackButton = document.createElement("button");
    BackButton.innerText = "Back";
    BackButton.classList.add("inputFloat");
    const indexOfTamp = templates.findIndex((tamp) => tamp.name == templateBase.name);
    BackButton.onclick = () => {
      templateSelector.value = indexOfTamp;
      toggleCustomTemplateEditor();
    }

    editor.appendChild(BackButton);
  }


  // Tamplet Name
  const tampletNameLable = document.createElement("label");
  tampletNameLable.innerText = "Tamplet Name:";
  const tampletNameInput = document.createElement("input");
  tampletNameInput.type = "text";
  tampletNameInput.value = templateBase?.name || "";

  // Main HTML input
  const htmlLabel = document.createElement("label");
  htmlLabel.innerText = "Main HTML:";
  const htmlInput = document.createElement("textarea");
  htmlInput.id = "customMainHtml";
  htmlInput.style.width = "100%";
  htmlInput.style.height = "200px";
  htmlInput.value = templateBase?.component?.[0]?.html || "";

  // How many components?
  const countLabel = document.createElement("label");
  countLabel.innerText = "Number of Components:";
  const countInput = document.createElement("input");
  countInput.id = "componentCountInput";
  countInput.type = "number";
  countInput.min = 0;
  countInput.value = templateBase?.component?.length - 1 || 0;
  countInput.classList.add("inputFloat");


  // Area for component inputs
  const componentContainer = document.createElement("div");
  componentContainer.id = "componentInputs";

  countInput.onchange = () => {
    generateEditObjectComponenet()
  };



  function generateEditObjectComponenet() {
    const allcomponent = componentContainer.querySelectorAll(":scope > div");
    let allInputValues = [];

    //save all values
    allcomponent.forEach((component) => {
      const titleInput = component.getElementsByTagName("input")[0];
      const htmlInput = component.getElementsByTagName("textarea")[0];
      const object = {
        title: titleInput.value,
        html: htmlInput.value,
      }
      allInputValues.push(object);
    });
    console.log(allInputValues);


    //Resate and add values
    componentContainer.innerHTML = "";
    const count = parseInt(countInput.value);
    for (let i = 0; i < count; i++) {
      const wrapper = document.createElement("div");
      wrapper.style.border = "1px solid #ccc";
      wrapper.style.padding = "10px";
      wrapper.style.marginTop = "10px";

      const nameInput = document.createElement("input");
      nameInput.placeholder = `Component ${i + 1} Name`;
      nameInput.style.width = "100%";
      nameInput.classList.add("compNameInput");
      nameInput.value = templateBase?.component?.[i + 1]?.name || allInputValues?.[i]?.title || "";

      const htmlInput = document.createElement("textarea");
      htmlInput.placeholder = `Component ${i + 1} HTML`;
      htmlInput.style.width = "100%";
      htmlInput.style.height = "120px";
      htmlInput.classList.add("compHtmlInput");
      htmlInput.value = templateBase?.component?.[i + 1]?.html || allInputValues?.[i]?.html || "";

      console.log(nameInput);
      wrapper.appendChild(nameInput);
      wrapper.appendChild(document.createElement("br"));
      wrapper.appendChild(htmlInput);
      componentContainer.appendChild(wrapper);
    }
  }


  // Add-Uodate button
  const generateBtn = document.createElement("button");
  console.log(templateSelector.value);
  generateBtn.innerText = templateSelector.value === "custom" ? "Add" : "Update";
  generateBtn.onclick = () => {
    const newTemplate = GenerateSingleTemplate();

    let newIndex = -1;
    if (templates?.findIndex((x) => x.name.toLocaleLowerCase() === tampletNameInput.value.toLocaleLowerCase()) >= 0) {
      newIndex = templates?.findIndex((x) => x.name.toLocaleLowerCase() === tampletNameInput.value.toLocaleLowerCase());
    }
    if (newIndex == -1) {
      templates.push(newTemplate);
      newIndex = templates.length - 1;
      const option = document.createElement("option");
      option.value = newIndex;
      option.innerText = tampletNameInput.value;
      templateSelector.appendChild(option);
    }
    else {
      templates[newIndex] = newTemplate;
    }

    templateSelector.value = newIndex;
    generateEditor();
  };

  // Copy button
  const copyBtn = document.createElement("button");
  copyBtn.innerText = "Copy";
  copyBtn.onclick = () => {
    const template = GenerateSingleTemplate();

    navigator.clipboard.writeText(JSON.stringify(template, null, 2)).then(() => {
      alert("Template JSON copied!");
    });

  };

  // Downlond this template button
  const downloadBtn = document.createElement("button");
  downloadBtn.innerText = "Download";
  downloadBtn.onclick = () => {
    const template = GenerateSingleTemplate();
    const listTemplate = [template];
    downdlondList(listTemplate, template.name);
  };



  // Assemble UI
  container.appendChild(tampletNameLable);
  container.appendChild(tampletNameInput);
  container.appendChild(document.createElement("br"));
  container.appendChild(htmlLabel);
  container.appendChild(htmlInput);
  container.appendChild(document.createElement("br"));
  container.appendChild(countLabel);
  container.appendChild(countInput);
  container.appendChild(componentContainer);
  container.appendChild(generateBtn);
  container.appendChild(copyBtn);
  container.appendChild(downloadBtn);
  editor.appendChild(container);
  generateEditObjectComponenet();


  function GenerateSingleTemplate() {
    const names = [...componentContainer.querySelectorAll(".compNameInput")];
    const htmls = [...componentContainer.querySelectorAll(".compHtmlInput")];
    const mainHtml = htmlInput.value;
    const components = names.map((nameInput, i) => ({
      name: nameInput.value,
      html: htmls[i].value,
    }));
    const template = {
      name: tampletNameInput.value,
      component: [{ name: "Main", html: mainHtml }, ...components],
    };
    return template;
  }

  rendered.srcdoc = `<style>body{direction: rtl; margin: 0px;}</style><h1 style="text-align: center; margin-bottom: 0; font-family: 'Rubik'; font-size: 2.3rem;">Cant show preview</h1>
  <h2 style="text-align: center; margin-top: 0px; font-family: 'Rubik'; font-weight: 500;">as template is being edited</h2>`;

  rendered.style.height = '10rem';

  const allButtons = document.querySelectorAll("#previewMenu button");
  console.log(allButtons);
  allButtons.forEach(button => {
    button.disabled = true;
  });

}


function updateTempletByUrl() {
  const value = getUrlParameter('value');
  if (value !== null) {
    templateSelector.value = value;
  }
}

function jsonHandler() {
  const popup = document.getElementById("TampletSelectOptions");

  document.getElementById("templateOptionsButton").addEventListener('click', (event) => {
    event.stopPropagation();
    popup.setAttribute("isOpen", "true");
    popup.style.top = `${event.pageY}px`;
    popup.style.left = `${event.pageX}px`;
    popup.style.display = "block";

    document.getElementById("downloadJsonBtn").disabled = templates.length == 0;
    document.getElementById("clearTempletsBtn").disabled = templates.length == 0;
  });


  document.getElementById("uploadJsonBtn").addEventListener("change", function (event) {
    console.log("startUpdate");
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const uploadedData = JSON.parse(e.target.result);

        addTempletToList(uploadedData);
      } catch (err) {
        console.error("Failed to parse file:", err);
        alert("Invalid JSON format.");
      }
    };

    reader.readAsText(file);

  });

  document.getElementById("replaceJsonBtn").addEventListener("change", function (event) {
    console.log("startUpdate");
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const uploadedData = JSON.parse(e.target.result);

        if (!Array.isArray(uploadedData)) {
          throw new Error("Uploaded data must be an array.");
        }

        templates = uploadedData;

        console.log("Updated data:", templates);
        populateTemplates();
        generateEditor();
        alert("Upload and merge complete!");

      } catch (err) {
        console.error("Failed to parse file:", err);
        alert("Invalid JSON format.");
      }
    };

    reader.readAsText(file);

  });

  document.getElementById("downloadJsonBtn").addEventListener("click", function () {
    downdlondList(templates);
  });

}

function addTempletToList(uploadedData) {
  if (!Array.isArray(uploadedData)) {
    throw new Error("Uploaded data must be an array.");
  }

  //Merge logic
  uploadedData.forEach((uploadedItem) => {
    const existingIndex = templates.findIndex(item => item.name.toLowerCase() === uploadedItem.name.toLowerCase());
    if (existingIndex !== -1) {
      // Replace existing item with the same name
      templates[existingIndex] = uploadedItem;
    } else {
      // Add new item
      templates.push(uploadedItem);
    }
  });

  console.log("Updated data:", templates);
  populateTemplates();
  generateEditor();
  alert("Upload and merge complete!");

}

function downdlondList(content, filename = "template", formate = "json") {
  const fullFileName = `${filename}.${formate}`;
  const jsonStr = JSON.stringify(content, null, 2); // Pretty print with 2-space indent

  const blob = new Blob([jsonStr], { type: "application/${formate}" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fullFileName;
  a.click();

  URL.revokeObjectURL(url); // Clean up the blob URL
}

/**
 * Generate the editor UI based on selected template
 */
async function generateEditor() {
  if (templates.count == 0) {
    console.error("Cant Generate Editor");
    return;
  }

  // Clear previous editor content
  editor.innerHTML = "";

  if (templateSelector.value == "custom") {
    console.error("Cant generate custom");
    return;
  }
  // Get selected template index
  const templateIndex = parseInt(templateSelector.value);

  // Validate template index
  if (templateIndex < 0 || templateIndex >= templates.length) {
    console.error("Invalid template index: " + templateIndex);
    return;
  }

  // Set current template and generate editor UI
  currentTemplate = templates[templateIndex].component[0].html;
  generateEditorForHtml(currentTemplate);

  // Update preview with current values
  updatePreview();
}

/**
 * Get the repeat count for a component
 * @param {string} componentName - Name of the component
 * @returns {number} - Current repeat count
 */
function getComponentRepeatCount(componentName) {
  const repeatObject = repeatComponentSaving.find((x) => x.name === componentName);

  if (!repeatObject) {
    const newRepeatObject = { name: componentName, repeat: 1 };
    repeatComponentSaving.push(newRepeatObject);
    return 1;
  }

  return repeatObject.repeat;
}

/**
 * Set the repeat count for a component
 * @param {string} componentName - Name of the component
 * @param {number} newValue - New repeat count
 */
function setComponentRepeatCount(componentName, newValue) {
  const obj = repeatComponentSaving.find(item => item.name === componentName);

  if (obj) {
    obj.repeat = newValue;
  }
}

/**
 * Generate editor UI based on template HTML
 * @param {string} templateHtml - HTML template with placeholders
 */
function generateEditorForHtml(templateHtml) {
  // Reset values object
  values = {};

  const editableButton = document.createElement("button");
  editableButton.innerText = "Edit";
  editableButton.classList.add("inputFloat");
  editableButton.onclick = () => {
    // Get selected template index
    const templateIndex = parseInt(templateSelector.value);

    // Validate template index
    if (templateIndex < 0 || templateIndex >= templates.length) {
      console.error("Invalid template index: " + templateIndex);
      return;
    }

    // Set current template and generate editor UI
    currentTemplate = templates[templateIndex];

    generateCustom(currentTemplate);
  };

  editor.appendChild(editableButton);

  // Process component placeholders
  const processedTemplate = repeatChackComponent(templateHtml);
  console.log(processedTemplate);
  // Generate input fields for all placeholders
  generateInputFields(processedTemplate);
}

function repeatChackComponent(html, maxRepeat = 10, currentReapet = 0) {
  console.log(html);
  currentReapet++;
  const regex = /\${([^:}]+):component}/g;
  if (regex.test(html)) {


    const newHtml = processComponentPlaceholders(html);

    if (currentReapet <= maxRepeat) {
      return repeatChackComponent(newHtml, maxRepeat, currentReapet)
    }
    else {
      return newHtml;
    }
  }
  else {
    console.log(html);
    return html;
  }
}

/**
 * Process component placeholders in template HTML
 * @param {string} templateHtml - Template HTML with component placeholders
 * @returns {string} - Processed template with expanded components
 */
function processComponentPlaceholders(templateHtml) {
  let processedTemplate = templateHtml;
  const componentMatches = [...templateHtml.matchAll(/\${([^:}]+):component}/g)];

  componentMatches.forEach(match => {
    const [fullMatch, componentName] = match;
    const templateIndex = parseInt(templateSelector.value);
    let componentHtml = null;

    try {
      let cleanName = componentName.replace(/\d+$/, "");
      console.log(templates[templateIndex]);
      console.log(templates[templateIndex].component);
      console.log(componentName);
      console.log(templates[templateIndex].component.find((x) => x.name === cleanName));
      //  ?.html;

      componentHtml = templates[templateIndex].component.find((x) => x.name === cleanName)?.html;
      console.log(componentHtml);
    } catch (error) {
      console.error(`Error finding component: ${componentName}`, error);
    }

    if (componentHtml) {
      const repeatCount = getComponentRepeatCount(componentName);
      let expandedHtml = `\${${componentName}:Component}`;

      for (let i = 0; i < repeatCount; i++) {
        expandedHtml += `\${${componentName}${i}:ComponentTitel}`;

        // Replace placeholders in component with indexed versions
        const componentPlaceholders = [...componentHtml.matchAll(/\${(.*?)}+/g)];
        componentPlaceholders.forEach(placeholder => {
          const [fullPlaceholder, content] = placeholder;
          const indexedPlaceholder = fullPlaceholder.replace(/\${([^:]+):/, `\${$1${i}:`);
          expandedHtml += indexedPlaceholder;
        });
      }

      processedTemplate = processedTemplate.replace(fullMatch, expandedHtml);
    }
  });

  return processedTemplate;
}

/**
 * Generate input fields for all placeholders in the template
 * @param {string} templateHtml - Template HTML with placeholders
 */
function generateInputFields(templateHtml) {
  const placeholders = [...templateHtml.matchAll(/\${(.*?)}+/g)];

  placeholders.forEach(match => {
    const [fullMatch, content] = match;
    const [label, rest] = content.split(':');

    // Skip if we already created an input for this label
    if (values[label]) return;

    const [type, defaultValue] = rest ? rest.split('->') : ["text", ""];

    if (type === "Component") {
      createComponentInput(label);
    } else if (type === "ComponentTitel") {
      createComponentTitle(label);
    } else {
      createRegularInput(label, type, defaultValue);
    }
  });
}

/**
 * Create a component repeat count input
 * @param {string} label - Component name
 */
function createComponentInput(label) {
  const defaultValue = getComponentRepeatCount(label);

  // Create details element
  const details = document.createElement('details');
  details.id = label + "Details";

  // Create summary element
  const summary = document.createElement('summary');

  // Create input element
  const input = document.createElement('input');
  input.classList.add("inputFloat");
  input.type = "number";
  input.value = defaultValue || "";
  input.dataset.key = label;

  // Add event listeners
  input.addEventListener('change', () => {
    updateComponentOnly(input, label);
    updatePreview();
    // updateComponentOnly(input,label);
    // setComponentRepeatCount(label, input.value);
    //generateEditor();
  });

  // Create label element
  const labelEl = document.createElement('label');
  labelEl.innerText = label + ": ";
  labelEl.classList.add("componentTitle");
  labelEl.style.fontSize = "1em";

  // Assemble elements
  summary.appendChild(labelEl);
  summary.appendChild(input);
  details.appendChild(summary);
  editor.appendChild(details);

  // Store input reference
  values[label] = input;
}


/**
 * Update only a specific component's repeat count without regenerating the entire editor
 * @param {HTMLInputElement} input - The input element that triggered the update
 * @param {string} componentName - Name of the component to update
 */
function updateComponentOnly(input, componentName) {
  // Get the new repeat count
  const newRepeatCount = parseInt(input.value);
  const oldRepeatCount = getComponentRepeatCount(componentName);

  // Get the details element that contains the component inputs
  const detailsElement = document.getElementById(componentName + "Details");
  if (!detailsElement) {
    console.error(`Details element for ${componentName} not found`);
    return;
  }

  // Save current values from all inputs in this component
  const savedValues = {};
  const inputs = detailsElement.querySelectorAll('input');
  inputs.forEach(input => {
    if (input.dataset.key && input.dataset.key !== componentName) {
      savedValues[input.dataset.key] = input.value;
    }
  });

  // Clear the details element contents except for the summary
  const summary = detailsElement.querySelector('summary');
  detailsElement.innerHTML = '';
  detailsElement.appendChild(summary);

  // Find the component template
  const templateIndex = parseInt(templateSelector.value);
  const componentObject = templates[templateIndex].component.find(x => x.name === componentName);
  if (!componentObject) {
    console.error(`Component object for ${componentName} not found`);
    return;
  }

  // Generate the new component content
  const componentHtml = componentObject.html;

  // Track processed placeholders to avoid duplicates
  const processedPlaceholders = new Set();

  // For each repeat instance, create the inputs
  for (let i = 0; i < newRepeatCount; i++) {
    // Create component title
    const subTitle = document.createElement('div');
    subTitle.classList.add("componentTitle");
    subTitle.textContent = componentName + i;
    detailsElement.appendChild(subTitle);

    // Extract placeholders from component HTML
    const componentPlaceholders = [...componentHtml.matchAll(/\${(.*?)}+/g)];

    // Create inputs for each placeholder
    componentPlaceholders.forEach(match => {
      const [fullMatch, content] = match;
      const [label, rest] = content.split(':');
      const indexedLabel = label + i;

      // Skip if the placeholder is a component itself
      if (rest && (rest.startsWith('component') || rest.startsWith('Component'))) {
        return;
      }

      // Skip if we've already processed this indexed placeholder
      if (processedPlaceholders.has(indexedLabel)) {
        return;
      }
      processedPlaceholders.add(indexedLabel);

      const [type, defaultValue] = rest ? rest.split('->') : ["text", ""];

      // Create input element
      const input = document.createElement('input');
      input.type = type || "text";
      if (type == "file") {

        input.setAttribute("accept", "image/*");
      }

      // Use saved value if available, otherwise use default
      if (savedValues[indexedLabel] !== undefined && i < oldRepeatCount) {
        input.value = savedValues[indexedLabel];
      } else {
        input.value = defaultValue || "";
      }

      input.dataset.key = indexedLabel;
      input.addEventListener('change', updatePreview);

      // Create label element
      const labelEl = document.createElement('label');
      labelEl.innerText = indexedLabel + ": ";

      // Add elements to container
      detailsElement.appendChild(labelEl);
      detailsElement.appendChild(input);
      detailsElement.appendChild(document.createElement('br'));

      // Update values object
      values[indexedLabel] = input;
    });
  }

  // Update the repeat count in storage
  setComponentRepeatCount(componentName, newRepeatCount);

  // Update the preview with new values
  updatePreview();
}


/**
 * Create a component title element
 * @param {string} label - Component title text
 */
function createComponentTitle(label) {
  const subTitle = document.createElement('div');
  subTitle.classList.add("componentTitle");
  subTitle.textContent = label;

  // Find parent container
  let parentContainer = editor;
  if (isNaN(label[label.length - 1]) === false) {
    const allDetails = document.getElementsByTagName("details");
    if (allDetails.length > 0) {
      parentContainer = allDetails[allDetails.length - 1];
    }
  }

  parentContainer.appendChild(subTitle);
}

/**
 * Create a regular input field
 * @param {string} label - Input label
 * @param {string} type - Input type
 * @param {string} defaultValue - Default value
 */
function createRegularInput(label, type, defaultValue) {
  // Create input element
  const input = document.createElement('input');
  input.type = type;
  input.value = defaultValue || "";
  input.dataset.key = label;
  input.addEventListener('change', updatePreview);

  if (type == "file") {

    input.setAttribute("accept", "image/*");
  }

  // Create label element
  const labelEl = document.createElement('label');
  labelEl.innerText = label + ": ";

  // Find parent container
  let parentContainer = editor;
  if (isNaN(label[label.length - 1]) === false) {
    const allDetails = document.getElementsByTagName("details");
    if (allDetails.length > 0) {
      parentContainer = allDetails[allDetails.length - 1];
    }
  }

  // Add elements to container
  parentContainer.appendChild(labelEl);
  parentContainer.appendChild(input);
  parentContainer.appendChild(document.createElement('br'));

  // Store input reference
  values[label] = input;
}

/**
 * Update the preview with current values
 */
async function templateReadyToPreview() {
  // Start with the original template
  let filledTemplate = currentTemplate;

  // Process component placeholders
  filledTemplate = expandComponentPlaceholders(filledTemplate);

  // Replace all placeholders with input values
  // Object.keys(values).forEach(label => {
  //   const input = values[label];
  //   const regex = new RegExp(`\\$\\{${label}(:[a-z]+(->.*?)?)?\\}`, 'g');

  //   if(input.type=="file"){
  //     //update the image data of the file

  //     // if (input && input.files && input.files[0]) {
  //     //   const objectUrl = URL.createObjectURL(input.files[0]);
  //     //   filledTemplate = filledTemplate.replace(regex, objectUrl);
  //     // }

  //     if (fileInput && fileInput.files && fileInput.files[0]) {
  //       try {
  //         // Wait for the file to be converted to base64
  //         const base64Data = await getFileAsBase64(fileInput.files[0]);
  //         filledTemplate = filledTemplate.replace(regex, base64Data);
  //       } catch (error) {
  //         console.error("Error processing file:", error);
  //         filledTemplate = filledTemplate.replace(regex, '');
  //       }
  //     } else {
  //       filledTemplate = filledTemplate.replace(regex, '');
  //     }
  //   }
  //   else{
  //     filledTemplate = filledTemplate.replace(regex, input.value);
  //   }

  // });
  for (const label of Object.keys(values)) {
    const input = values[label];
    const regex = new RegExp(`\\$\\{${label}(:[a-z]+(->.*?)?)?\\}`, 'g');

    if (input.type == "file") {

      if (input && input.files && input.files[0]) {
        try {
          // Wait for the file to be converted to base64
          const base64Data = await getFileAsBase64(input.files[0]);
          filledTemplate = filledTemplate.replace(regex, base64Data);
        } catch (error) {
          console.error("Error processing file:", error);
          filledTemplate = filledTemplate.replace(regex, '');
        }
      } else {
        filledTemplate = filledTemplate.replace(regex, '');
      }
    } else {
      filledTemplate = filledTemplate.replace(regex, input.value);
    }
  }

  console.log(filledTemplate);
  return filledTemplate
}

function getFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function updatePreview() {

  let filledTemplate = await templateReadyToPreview();

  // Update preview elements
  rendered.srcdoc = filledTemplate;
  rendered.srcdoc += `<style>body{direction: rtl; margin: 0px;}</style>
  <script>
  window.onload = () => {
      const wrapper = document.body;
  const rect = wrapper.getBoundingClientRect();
    parent.postMessage({
      type: 'resize-iframe',
      height: rect.height + rect.top + 40
    }, '*');
  };

  
</script>`;
  const formattedCode = formatHTMLString(filledTemplate);
  rawCode.innerText = formattedCode;

  window.addEventListener('message', (event) => {
    if (event.data?.type === 'resize-iframe') {
      rendered.style.height = event.data.height + 'px';
    }
  });

  const allButtons = document.querySelectorAll("#previewMenu button");
  console.log(allButtons);
  allButtons.forEach(button => {
    button.disabled = false;
  });
}

/**
 * Expand component placeholders with actual component HTML
 * @param {string} templateHtml - Template HTML with component placeholders
 * @returns {string} - Expanded HTML with components
 */
function expandComponentPlaceholders(templateHtml) {
  let expandedTemplate = templateHtml;
  const componentMatches = [...templateHtml.matchAll(/\${([^:}]+):component}/g)];

  componentMatches.forEach(match => {
    const [fullMatch, componentName] = match;
    const templateIndex = parseInt(templateSelector.value);
    console.log(templateIndex);
    console.log(componentName);
    const componentHtml = templates[templateIndex].component.find((x) => x.name === componentName).html;
    let expandedHtml = "";

    // Generate HTML for each component instance
    for (let i = 0; i < getComponentRepeatCount(componentName); i++) {
      let instanceHtml = componentHtml;
      const componentPlaceholders = [...componentHtml.matchAll(/\${(.*?)}+/g)];

      // Replace placeholders with indexed versions
      componentPlaceholders.forEach(placeholder => {
        const [fullPlaceholder, content] = placeholder;
        const indexedPlaceholder = fullPlaceholder.replace(/\${([^:]+):/, `\${$1${i}:`);
        instanceHtml = instanceHtml.replace(fullPlaceholder, indexedPlaceholder);
      });

      expandedHtml += instanceHtml;
    }

    expandedTemplate = expandedTemplate.replace(fullMatch, expandedHtml);
  });

  return expandedTemplate;
}


/*Toggle between rendered preview and raw code view*/
function togglePreview() {
  const isCodeVisible = rawCode.style.display === 'block';
  rawCode.style.display = isCodeVisible ? 'none' : 'block';
  rendered.style.display = isCodeVisible ? 'block' : 'none';
}

/*Copy raw code to clipboard*/
function copyCode() {
  navigator.clipboard.writeText(rawCode.innerText).then(() => {
    alert("Code copied to clipboard!");
  });
}


/**
 * Format HTML string for better readability
 * @param {string} htmlString - Raw HTML string
 * @returns {string} - Formatted HTML string
 */
function formatHTMLString(htmlString) {
  return htmlString.replace(/</g, '\n<').replace(/>/g, '>\n');
}

/*Initialize context menu for copy/paste functionality*/
function initializeContextMenu() {
  let copiedValue = null;  // Stores the copied value

  // Show context menu on right-click
  document.addEventListener("contextmenu", (event) => {
    const target = event.target;
    // Check if it's an input and outside of #preview
    if (target.tagName === "INPUT" && !document.getElementById("preview").contains(target)) {
      event.preventDefault();  // Prevent default context menu

      // Show custom context menu
      contextMenu.style.top = `${event.pageY}px`;
      contextMenu.style.left = `${event.pageX}px`;
      contextMenu.style.display = "block";
      document.getElementById("pasteBtn").disabled = copiedValue == null;
      document.getElementById("pasteAllBtn").disabled = copiedValue == null;

      // Store current input reference
      contextMenu.targetInput = target;
    }
    else if (target.tagName === "TEXTAREA" &&
      typeof target.selectionStart === "number" &&
      target.selectionStart != target.selectionEnd) {
      event.preventDefault();  // Prevent default context menu

      contextMenu_ConvertToParm.style.top = `${event.pageY}px`;
      contextMenu_ConvertToParm.style.left = `${event.pageX}px`;
      contextMenu_ConvertToParm.style.display = "block";

      contextMenu_ConvertToParm.getElementsByTagName("button")[0].disabled = target.id != "customMainHtml";
    }
    else if (target.id === "saveImageBut" && target.disabled == false) {
      event.preventDefault();  // Prevent default context menu

      contextMenu_SaveImage.style.top = `${event.pageY}px`;
      contextMenu_SaveImage.style.left = `${event.pageX}px`;
      contextMenu_SaveImage.style.display = "block";
    }
    else {
      hideContextMenu();
    }
  });

  // Copy button handler
  document.getElementById("copyBtn").addEventListener("click", () => {
    if (contextMenu.targetInput) {
      copiedValue = contextMenu.targetInput.value;
      navigator.clipboard.writeText(contextMenu.targetInput.value);
    }
    hideContextMenu();
  });

  // Paste button handler
  document.getElementById("pasteBtn").addEventListener("click", async () => {
    if (contextMenu.targetInput && copiedValue !== null) {
      contextMenu.targetInput.value = copiedValue;
      const inputEvent = new Event("change");
      contextMenu.targetInput.dispatchEvent(inputEvent);
    }
    hideContextMenu();
  });

  // Paste to all similar inputs handler
  document.getElementById("pasteAllBtn").addEventListener("click", () => {
    if (contextMenu.targetInput && copiedValue !== null) {
      applayValueToAllInctance(copiedValue, contextMenu.targetInput);
    }
  });

  // Paste to all similar inputs handler
  document.getElementById("applyForAllBtn").addEventListener("click", () => {
    applayValueToAllInctance(contextMenu.targetInput.value, contextMenu.targetInput);
  });

  // Hide menu on click outside
  window.addEventListener("click", () => {
    hideContextMenu();
  });

  function hideContextMenu() {
    contextMenu.style.display = "none";
    contextMenu_ConvertToParm.style.display = "none";
    contextMenu_SaveImage.style.display = "none";

    if (document.getElementById("TampletSelectOptions").getAttribute("isOpen") == "true") {
      document.getElementById("TampletSelectOptions").style.display = "none";
      document.getElementById("TampletSelectOptions").setAttribute("isOpen", "false");
    }
  }
}


function applayValueToAllInctance(value, instanceElement) {
  const input = instanceElement;
  if (!input) return;

  const valueToPaste = value;
  const baseKey = (input.dataset.key || "").replace(/\d+$/, "").trim();
  const inputType = input.type;
  const detailsElement = input.closest("details");

  if (!detailsElement || !baseKey) return;

  const inputs = detailsElement.querySelectorAll("input");

  inputs.forEach((otherInput) => {
    const otherKey = (otherInput.dataset.key || "").replace(/\d+$/, "").trim();
    if (otherInput.type === inputType && otherKey === baseKey) {
      otherInput.value = valueToPaste;
      const inputEvent = new Event("change");
      otherInput.dispatchEvent(inputEvent);
    }
  });

  hideContextMenu();
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", start);

function getUrlParameter(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function replaceSelectedTextAuto(parameterName, parameterType) {
  const inputElement = document.activeElement;

  if (/\d+$/.test(parameterName)) {
    return "The name can't finish with numbers";
  }

  // Check if it's a text input or textarea
  if (
    inputElement &&
    (inputElement.tagName === "INPUT" || inputElement.tagName === "TEXTAREA") &&
    typeof inputElement.selectionStart === "number"
  ) {
    const start = inputElement.selectionStart;
    const end = inputElement.selectionEnd;

    if (start == end) {
      return "Nothing is Selected";
    }

    const selectionContent = inputElement.value.slice(start, end);
    const defaultValue = parameterType != "component" && selectionContent ? "->" + selectionContent : "";
    const originalText = inputElement.value;
    const parameter = "${" + parameterName + ":" + parameterType + defaultValue + "}";

    const newText = originalText.slice(0, start) + parameter + originalText.slice(end);

    inputElement.value = newText;

    const newCursorPosition = start + parameter.length;
    inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
    inputElement.focus();

    if (parameterType == "component") {
      const inputComponenets = document.getElementById("componentCountInput");
      inputComponenets.value = Number(inputComponenets.value) + 1;
      inputComponenets.dispatchEvent(new Event("change"));

      const getLastComponenet = document.getElementById("componentInputs").querySelectorAll(":scope > div:last-child")[0];
      getLastComponenet.getElementsByClassName("compNameInput")[0].value = parameterName;
      getLastComponenet.getElementsByClassName("compHtmlInput")[0].value = selectionContent;
    }

    return "finish";
  } else {
    return "Focused element is not a text input or textarea.";
  }
}


document.addEventListener("keydown", function (event) {
  if (event.key === "F4") {
    event.preventDefault(); // Optional: prevent default browser behavior
    replaceSelectedTextAuto("Yosi", "component"); // Or any other replacement text
  }
});

// function popupHide(){
//   const popupCon = document.getElementById("popupCon");
//   popupCon.style.display = "none";
// }

// function popupShow(isComponent){
//   const popupCon = document.getElementById("popupCon");
//   const popupSubmitBut = document.getElementById("popupSubmit");
//   const popupParmName =  document.getElementById("PopupSelectParameterName");
//   const popupParmType = document.getElementById("PopupSelectParameterType");

//   let finalParmType = popupParmType.value;
//   let willDisplaySelectDropdown = "Block";
//   if(isComponent){
//     popupSubmitBut.innerText="Add Component";
//     finalParmType = "component";
//     willDisplaySelectDropdown="none";
//   }

//   document.getElementById("popupSelectDropdown").style.display = willDisplaySelectDropdown;

//   const inputElement = document.activeElement;
//   const requriedParams =
//   {
//     "inputElement":inputElement,
//     "selectionStart":inputElement.selectionStart,
//     "selectionEnd":inputElement.selectionEnd
//   }

//   popupSubmitBut.onclick = ()=>{
//     const isCleated = replaceSelectedTextAuto(popupParmName.value,finalParmType,requriedParams);

//     if(isCleated=="finish"){
//       popupHide();
//     }
//    else{
//     const popupError=  document.getElementById("PopupError");
//     popupError.innerText = isCleated;
//    }
//   };
// }

async function renderHtmlAsPng(scaleing = 1, format = "png") {
  fileName = templateSelector.value;

  htmlContent = await templateReadyToPreview();
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.left = "-9999px";
  iframe.style.top = "0";
  iframe.style.visibility = "hidden";
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(htmlContent);
  iframeDoc.close();

  iframe.onload = () => {
    const iframeWin = iframe.contentWindow;
    const body = iframeDoc.body;

    // Inject html2canvas
    const script = iframeDoc.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
    script.onload = () => {
      // Wait a bit in case fonts/images are still settling
      setTimeout(() => {
        const width = body.getBoundingClientRect().width;
        const height = body.getBoundingClientRect().height;

        iframe.style.width = width + "px";
        iframe.style.height = height + "px";

        iframeWin.html2canvas(body, {
          width,
          height,
          useCORS: true,
          backgroundColor: null,
          scale: scaleing
        }).then(canvas => {
          const link = document.createElement("a");
          link.download = `${fileName}.${format}`;
          link.href = canvas.toDataURL(`image/${format}`);
          link.click();
          document.body.removeChild(iframe); // cleanup
        });
      }, 100); // optional wait
    };
    body.appendChild(script);
  };

  if (iframe.contentDocument.readyState === "complete") {
    iframe.onload();
  }
}

function clearSelection() {
  templates = [];
  populateTemplates();
  toggleCustomTemplateEditor();
}

function addExamples() {
  addTempletToList(Examples);
}
