import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import TagsList from './TagsList'
import "./Tags.css"
const Tags = () => {
    const tagsList=[
        {
            id:1,
            tagName:"first",
            tagDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, fugit?"
        },
        {
            id:2,
            tagName:"second",
            tagDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, fugit?"
        },
        {
            id:3,
            tagName:"third",
            tagDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, fugit?"
        },
        {
            id:4,
            tagName:"four",
            tagDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, fugit?"
        },
        {
            id:5,
            tagName:"five",
            tagDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, fugit?"
        },
        {
            id:6,
            tagName:"six",
            tagDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, fugit?"
        },
        {
            id:7,
            tagName:"seven",
            tagDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, fugit?"
        }
    ];
  return (
    <div className='home-container-1'>
        <LeftSidebar />
        <div className="home-container-2">
            <h1 className='tags-h1'>Tags</h1>
            <p className='tags-p'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem, enim?</p>
            <p className='tags-p'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis dolorum nesciunt quos.</p>
            <div className="tags-list-container">
                {
                    tagsList.map((tag)=>(
                        <TagsList tag={tag} key={tagsList.id}/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Tags;