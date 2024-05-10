import { Link } from "react-router-dom";
import "../styles/homePage.css"
import { useEffect } from 'react';
import { gsap } from 'gsap';





export default function Homepage() {

    useEffect(() => {
    gsap.from('.textContainer', { duration: 1.5, y: 30, opacity: 0, ease: 'power3.out' });
    }, []);

    return (
      <>
        <img
          src='https://res.cloudinary.com/dzeil57n4/image/upload/v1713723834/p2mpfyk2trnjy9aks306.png'
          alt='image 2'
          className='image'
            />
            {/* <div className="cifar-container">
                <div className="cifar-container2">
                    <img
                    src = "https://res.cloudinary.com/dzeil57n4/image/upload/v1715339841/cifar_v5tgqg.png"
                    alt='cifar image'
                    className='image2'
                    />
                </div>
            </div> */}
                
        <div className='container'>
          <div className='innerContainer'>
            <div className='textContainer'>
                <div className='heading'>Quick and Easy Image Annotation</div>
                <div className='subText'>
                    Upload and Annotate your images with &nbsp;<i style={{fontWeight: 900}}>CIFAR-10</i> &nbsp; classes
                </div>
                    <div className='buttonContainer'>
                <Link to='/gallery'>
                    <button className='buttonStyle'>
                        View Gallery
                    </button>
                  </Link>
                  <Link to='/upload'>
                    <button className='buttonStyle2'>
                        Annotate
                    </button>
                  </Link>
                </div>
            </div>
          </div>
        </div>
      </>
  );
}

