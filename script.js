var windows = document.querySelectorAll(".window");
var closeButtons = document.querySelectorAll(".close-box");
var selectedIcon = undefined

function updateTime() {
  var currentTime = new Date().toLocaleString();
  var timeText = document.querySelector("#timeElement");
  timeText.innerHTML = currentTime;
}

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element
} 

function deselectIcon(element) {
  element.classList.remove("selected");
  selectedIcon = element
} 

function handleIconTap(element) {
  if (element.classList.contains("selected")) {
    deselectIcon(element)
    openWindow(window)
  } else {
    selectIcon(element)
  }
}

setInterval(updateTime, 1000);
updateTime();


// Make every window draggable
windows.forEach(function(windowElement) {
  dragElement(windowElement);
});


function dragElement(element) {
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  element.onmousedown = startDragging;

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


// Close every window when its Close button is clicked
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

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
}

var notesIcon = document.querySelector("#notesIcon");
var notesWindow = document.querySelector("#notesWindow");

notesIcon.addEventListener("click", function() {
  openWindow(notesWindow);
});

function handleWindowTap(element) {
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
}
