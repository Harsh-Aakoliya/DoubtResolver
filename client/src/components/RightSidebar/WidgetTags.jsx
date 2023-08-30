import React from 'react'

export const WidgetTags = () => {
    const tags=['t1','t1','t1','t1','t1','t1','t1','t1','t1','t1','t1','t1','t1','t1','t1','t1','t1','t1','t1']
  return (
    <div className='widget-tags'>
        <h4>Watched Tags</h4>
        <div className='widget-tags-div'>
            {
                tags.map((tag)=>{
                   return <p key={tag}>{tag}</p>
                })
            }

        </div>
    </div>
  )
}
