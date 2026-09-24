var selectedIcon = undefined

function updateTime() {
  var currentTime = new Date().toLocaleString();
  var timeText = document.querySelector("#timeElement");
  timeText.innerHTML = currentTime;
}

setInterval(updateTime, 1000);
updateTime()

function dragElement(element) {
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;

    // Don't drag when clicking the close button
    if (e.target.classList.contains("close-box")) {
      return;
    }

    e.preventDefault();

    initialX = e.clientX;
    initialY = e.clientY;

    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;

    initialX = e.clientX;
    initialY = e.clientY;

    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


function closeWindow(element) {
  element.style.display = "none";
}

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element
} 

function deselectIcon(element) {
  element.classList.remove("selected");
  selectedIcon = undefined
}

function handleIconTap(element) {
  if (element.classList.contains("selected")) {
    deselectIcon(element)
    openWindow(document.querySelector("#note"))
  } else {
    selectIcon(element)
  }
}

var biggestIndex = 1;

function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
  if (selectedIcon) deselectIcon(selectedIcon);
}

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}

var topBar = document.querySelector("#top")

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

function handleIconTap(icon, screen) {
  if (icon.classList.contains("selected")) {
    deselectIcon(icon)
    openWindow(screen)
  } else {
    selectIcon(icon)
  }
}

function makeClosable(elementName) {
  var win = document.querySelector("#" + elementName);
  var closeBtn = win.querySelector(".close-box");
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      closeWindow(win);
    });
  }
}

function initializeIcon(elementName) {
  var icon = document.querySelector("#" + elementName + "Icon");
  var screen = document.querySelector("#" + elementName);
  if (!icon) return; // not every window has an icon (intro, anecdote)
  icon.addEventListener("click", () => handleIconTap(icon, screen));
}


function initializeWindow(elementName) {
  var screen = document.querySelector("#" + elementName)
  addWindowTapHandling(screen)
  makeClosable(elementName)
  dragElement(screen)

  if(elementName != "welcome") {
    initializeIcon(elementName)  
  }
}

initializeWindow("notes");
initializeWindow("intro");
initializeWindow("anecdote");
initializeWindow("identity");
intilalizeWindow("quote");

var content = [
  {
    title: "Welcome",
    date: "06/28/2023",
    content: `<p>Welcome to my notes app!</p>`
  },
  {
    title: "Second Sigma node",
    date: "22/09/20026",
    content: `<p>boom boom</p>`
  },
  {
    title: "Impossible",
    date: "69/420/20026",
    content: `<p>get a girlfriend</p>`
  },
  {
    title: "learn rust",
    date: "09/08/20026",
    content: `<p>finish rustlings</p>`
  }
]

function setNotesContent(index) {

  var notesContent = document.querySelector("#notesContent")

  notesContent.innerHTML = content[index].content
}

setNotesContent(0)

function addToSideBar(index) {
  var sidebar = document.querySelector("#sidebar");
  var note = content[index];
  var newDiv = document.createElement("div");
  newDiv.innerHTML = `
    <p style="margin: 0px;">${note.title}</p>
    <p style="font-size: 12px; margin: 0px;">${note.date}</p>
  `;
  newDiv.addEventListener("click", function() {
    setNotesContent(index);
  });
  sidebar.appendChild(newDiv);
}

for (let i = 0; i < content.length; i++) {
  addToSideBar(i);
}


