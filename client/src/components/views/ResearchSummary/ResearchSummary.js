//rfce 

import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import { Input, Space } from 'antd';
import axios from 'axios';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const onSearch = value => console.log(value);

function ResearchSummary() {
    const [videos, setVideos] = useState([])


  

  
     const handleTextSearch =(e)=> {
     const searchTerm = e.currentTarget.value ;
     axios.get('/api/video/getVideos')
               .then(response => {
                   if (response.data.success) {
                       setVideos(response.data.videos)
                       const result = videos.filter((video)=>video.title.includes(searchTerm));
                       setVideos(result);
                    } else {
                       alert('no summary availbel for this book !')
                   }
               });
    };
 
   return (
     //hi
     <div>
           <Search 
           placeholder="wish book to summarize !" 
           onChange={handleTextSearch} 
           onSearch={onSearch} 
           enterButton  />
 
     </div>
     
 
   );
}

export default ResearchSummary
