import Image from 'next/image'
import classes from './hero.module.scss'

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/image/site/Qimmah-Russo.08-820x1024.jpg"
          alt="an image showing Anon "
          width={400}
          height={400}
        ></Image>
      </div>
      <h1>Hi, I'm Anon</h1>
      <p> I blog about webdevelopment</p>
    </section>
  )
}

export default Hero
