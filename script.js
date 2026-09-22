var windows = document.querySelectorAll(".window");
var closeButtons = document.querySelectorAll(".close-box");
var selectedIcon = undefined

function updateTime() {
  var currentTime = new Date().toLocaleString();
  var timeText = document.querySelector("#timeElement");
  timeText.innerHTML = currentTime;
}

setInterval(updateTime, 1000);
updateTime();

windows.forEach(function(windowElement) {
  dragElement(windowElement);
});

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


// Close current button ( i found this so i dont have to assign closing for every window i crete )
closeButtons.forEach(function(button) {
  button.addEventListener("click", function(e) {
    e.stopPropagation();

    var windowElement = button.closest(".window");
    closeWindow(windowElement);
  });
});


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

var notesIcon = document.querySelector("#notesIcon");

notesIcon.addEventListener("click", function() {
    handleIconTap(notesIcon);
});

var biggestIndex = 1;

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

function handleWindowTap(element) {
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
  deselectIcon(selectedIcon)
}

var introScreen = document.querySelector("#intro");
var notesScreen = document.querySelector("#note");
var anecdoteScreen = document.querySelector("#anecdote");

addWindowTapHandling(anecdoteScreen);
addWindowTapHandling(introScreen);
addWindowTapHandling(notesScreen);

