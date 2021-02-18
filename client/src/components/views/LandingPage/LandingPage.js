import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import CheckBox from './Sections/CheckBox';
//import category from './Sections/categories';
import axios from 'axios';
import moment from 'moment';
import SearchFeature from "./Sections/SearchFeature"

const { Title } = Typography;
const { Meta } = Card;




function LandingPage() {

    const [Videos, setVideos] = useState([])
    
    const [SearchTerms, setSearchTerms] = useState("")
    const [Var, setVar]= useState()

    const [Filters, setFilters] = useState({
        categories: [],
        other: []
    })

    useEffect(() => {
        // s'effectue en temps reel tent que les conditions [] verifiés
        const variables = {

            filters:Filters
            
        }
        //setVar(Filters);

        getVideos(variables)
    }, [])


    const getVideos = (variables1) => {
        axios.get('/api/video/getVideos', variables1) // liaison backend et passage de parametres
            .then(response => {
                if (response.data.success) {
                    console.log(variables1)
                //console.log(response.data.videos)
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
    }

    const renderCards = Videos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <Col lg={6} md={8} xs={24}>
            <div className="imane" style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`} >
                <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                <div className=" duration"
                    style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                    color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                    padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                    fontWeight:'500', lineHeight:'12px' }}>
                    <span>{minutes} : {seconds}</span>
                </div>
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
            />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views}</span>
            - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        </Col>

    })

    /* filter */

    const showFilteredResults = (filters) => {

        const variables1 = {

            filters: filters

        }

           axios.post('/api/video/getVideos',variables1) // liaison backend et passage de parametres
            .then(response => {
                if (response.data.success) {
                //console.log(response.data.videos)
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })

    }


    const handleFilters = (filters, category) => {
        console.log(filters)
        const newFilters = { ...Filters }

        newFilters[category] = filters

        
        
        showFilteredResults(newFilters)
        setFilters(newFilters)
        //console.log(Filters)
        //console.log(newFilters)

        
    }
    
    /* search */

    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            
            filters: Filters,
            searchTerm: newSearchTerm
        }

       
        setSearchTerms(newSearchTerm)

        getVideos(variables)
    }


    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
           
            {/* Filter  */}

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24} >
                    <CheckBox
                        handleFilters={filters => handleFilters(filters, "categories")} 
                    />
                </Col>
                <Col lg={12} xs={24}>
                    {/* Search  */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>

                    <SearchFeature
                    refreshFunction={updateSearchTerms}
                    />

                    </div>
                </Col>
            </Row>

            

            <Title level={2} > 
            Recommended
             </Title>
             
            <hr />
            
            <Row gutter={16}>
                {renderCards}
            </Row>
            
        </div>
    )
}

export default LandingPage
