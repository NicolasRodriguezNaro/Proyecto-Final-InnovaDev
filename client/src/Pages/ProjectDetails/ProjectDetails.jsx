import React from 'react'
import "./ProjectDetails.css"

const ProjectDetails = () => {
  return (
    <div className='projectDetailsBackGround'>
      <div id='titleProjectDetails'>
        <h1>Nombre del proyecto</h1>
      </div>
      <div className='detailsContainer'>
        <div id='card'>
          <img id='imageMain' src="https://wallpapers.com/images/featured/gorillaz-pictures-xwau0n7ogqggnba5.jpg" alt="" />
          <div id='detailsData'></div>
          <div id='carruselCard'>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails