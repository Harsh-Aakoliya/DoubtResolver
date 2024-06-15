import React, {useState,useEffect} from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import TagsList from './TagsList'
import "./Tags.css"
import { useSelector } from 'react-redux'
const Tags = () => {
    const tagsList=useSelector((state)=>state.tagReducer)
        console.log("All available tags are ",tagsList);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  return (
    
    <div className='home-container-1'>
    { windowWidth>=700 && <LeftSidebar/>}
        <div className="home-container-2">
            <h1 className='tags-h1'>Tags</h1>
            <p className='tags-p'>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</p>
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