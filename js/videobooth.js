const videos = { video1: 'video/demovideo1', video2: 'video/demovideo2' }

function getFormatExtension() {
  const video = document.getElementById('video')
  if (video.canPlayType("video/mp4")) {
    return ".mp4";
  }else if (video.canPlayType("video/webm")) {
    return ".webm";
  }else if (video.canPlayType("video/ogg")) {
    return ".ogv";
  }
}

window.onload = () => {
  const video = document.getElementById('video')
  video.src = videos.video1 + getFormatExtension()
  video.load()

  const controlLinks = document.querySelectorAll('a.control')
  controlLinks.forEach(link => {
    link.onclick = handleControl
  })

  const effectLinks = document.querySelectorAll('a.effect');
  effectLinks.forEach( link => {
    link.onclick = setEffect
  })

  const videoLinks = document.querySelectorAll('a.videoSelection')
  videoLinks.forEach( link => {
    link.onclick = setVideo
  })

  pushUnpushButtons('video1', [])
  pushUnpushButtons('normal', [])
}

function handleControl(event) {
  const id = event.target.getAttribute('id')

  if (id === 'play') {
    pushUnpushButtons('play', ['pause'])
  } else if (id === 'pause') {
    pushUnpushButtons('pause', ['play'])
  } else if (id === 'loop') {
    if (isButtonPushed('loop')) {
      pushUnpushButtons('', ['loop'])
    } else {
      pushUnpushButtons('loop', [])
    }
  } else if (id === 'mute') {
    if (isButtonPushed('mute')) {
      pushUnpushButtons('', ['mute'])
    } else {
      pushUnpushButtons('mute', [])
    }
  }
}

function setEffect(event) {
  const id = event.target.getAttribute('id')

  if (id === 'normal') {
    pushUnpushButtons('normal', ['western', 'noir', 'scifi'])
  } else if (id === 'western') {
    pushUnpushButtons('western', ['normal', 'noir', 'scifi'])
  } else if (id === 'noir') {
    pushUnpushButtons('noir', ['normal', 'western', 'scifi'])
  } else if (id === 'scifi') {
    pushUnpushButtons('scifi', ['normal', 'western', 'noir'])
  }
}

function setVideo(event) {
  const id = event.target.getAttribute('id')
  if (id === 'video1') {
    pushUnpushButtons('video1', ['video2'])
  } else if (id === 'video2') {
    pushUnpushButtons('video2', ['video1'])
  }
}

function pushUnpushButtons(idToPush, idArrayToUnpush) {
  let anchor,
      theClass;
  if (idToPush != '') {
    anchor = document.getElementById(idToPush)
    theClass = anchor.getAttribute('class')

    if (!theClass.indexOf('selected') >= 0) {
      theClass = theClass + ' selected'
      anchor.setAttribute('class', theClass)
      let newimage = `url(images/${idToPush}pressed.png`
      anchor.style.backgroundImage = newimage
    }
  }

  idArrayToUnpush.forEach(id => {
    anchor = document.getElementById(id)
    theClass = anchor.getAttribute('class')
    if (theClass.indexOf('selected') >= 0) {
      theClass = theClass.replace('selected', '')
      anchor.setAttribute('class', theClass)
      anchor.style.backgroundImage = ''
    }
  })
}

function isButtonPushed(id) {
  let anchor = document.getElementById(id)
  let theClass = anchor.getAttribute('class')
  return (theClass.indexOf('selected') >= 0)
}