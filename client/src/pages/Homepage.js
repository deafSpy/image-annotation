import { Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Homepage() {
    const styles = {
        image: {
            position: 'absolute',
            height: '100%',
            width: '100%',
            objectFit: 'cover'
        },
        container: {
            position: 'relative',
            height: '100%',
            width: '100%',
            display: 'flex',
            fontFamily: "Lato"
        },
        innerContainer: {
            position: 'relative',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100%',
            display: 'grid',
            placeItems: 'center'
        },
        textContainer: {
            width: '75%',
            paddingLeft: '3rem',
            '@media (minWidth: 768px)': {
                width: '40%',
                paddingLeft: '5rem'
            },
            '@media (minWidth: 1024px)': {
                paddingLeft: '3.75rem'
            }
        },
        heading: {
            marginBottom: '1rem',
            fontSize: '5rem',
            '@media (minWidth: 768px)': {
                fontSize: '4rem'
            },
            '@media (minWidth: 1024px)': {
                fontSize: '5rem'
            },
            fontFamily: 'serif'
        },
        subText: {
            marginBottom: '3rem',
            opacity: 0.8,
            fontFamily: 'sans-serif'
        },
        buttonContainer: {
            display: 'flex',
            gap: '0.5rem',
            fontFamily: 'sans-serif'
        },
        buttonStyle: {
            fontFamily: 'Lato'
        }
    };

    return (
      <>
        <img
          src='https://res.cloudinary.com/dzeil57n4/image/upload/v1713723834/p2mpfyk2trnjy9aks306.png'
          alt='image 2'
          style={styles.image}
        />
        <div style={styles.container}>
          <div style={styles.innerContainer}>
            <div style={styles.textContainer}>
                <div style={{ ...styles.heading, fontFamily: 'serifB' }}>Image<br></br> Annotation</div>
                <div style={styles.subText}>
                    Upload and Annotate your images!
                </div>
                <div style={styles.buttonContainer}>
                  <Link to='/upload'>
                    <button style={styles.buttonStyle}>
                        Annotate!
                    </button>
                  </Link>
                  <Link to='/gallery'>
                    <button style={styles.buttonStyle}>
                        View Gallery
                    </button>
                  </Link>
                </div>
            </div>
          </div>
        </div>
      </>
  );
}

