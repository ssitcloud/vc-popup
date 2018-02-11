import Vue from 'vue'
import './animation.css'
import template from '../gesture-tile-press'
import { effectRegister } from 'vc-popup-base'

var TilePressConstructor = Vue.extend(template)

effectRegister('tilePress', function (progress, cfg, unset, vmBase) {
  var vmTile
  if (progress === 'in' && !unset) {
    vmTile = vmBase.wrapSlotWith(TilePressConstructor, {
      unsetOnPressEnd: false
    })
    var $el = vmBase.vmSlot.$el
    vmBase.setAnimateDom($el)

    $el.addEventListener('touchend', function () {
      setTimeout(function () {
        if (vmBase.isShowing)
          vmTile.unsetPressEffect()
      }, 30)
    })

    $el.classList.add('vc-effect-tile-press-inital')
    requestAnimationFrame(function () {
      $el.classList.remove('vc-effect-tile-press-inital')
      $el.classList.add('vc-effect-tile-press-in')
    })
  }

  if (progress === 'out' && !unset) {
    vmTile = vmBase.vmWrapper
    var $slot = vmTile.$refs.slot,
      deg = vmTile.maxDeg * 1.15

    vmBase.setAnimateDom($slot)
    vmTile.orientationY = vmTile.orientationY === undefined ? 1 : vmTile.orientationY
    vmTile.orientationX = vmTile.orientationX === undefined ? 0 : vmTile.orientationX

    requestAnimationFrame(function () {
      $slot.style.transitionDuration = '280ms'
      $slot.style.transform =
        `rotateX(${vmTile.orientationY * deg}deg) rotateY(${vmTile.orientationX * deg}deg) translateZ(-100px)`
      $slot.style.opacity = 0
    })
  }
})
