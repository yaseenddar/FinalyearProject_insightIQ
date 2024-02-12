import React from 'react'
import WidgetContent from './WidgetContent'
import './Widget.css'
export default function Widget() {
  return (
    <div>
      <div className="widget">
      <div className="widget__header">
        <h5>Space to follow</h5>
      </div>
      <div className="widget__contents">
        <WidgetContent />
      </div>
    </div>
    </div>
  )
}
