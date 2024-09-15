import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import { IconButton } from "@mui/material";

import { useRouter } from "next/router";

//const geistSans = localFont({
//  src: "./fonts/GeistVF.woff",
//  variable: "--font-geist-sans",
//  weight: "100 900",
//});
//const geistMono = localFont({
//  src: "./fonts/GeistMonoVF.woff",
//  variable: "--font-geist-mono",
//  weight: "100 900",
//});

export default function Home() {
  //const router = useRouter();
  return (
    <div className="bg-[radial-gradient(circle,_#111,_#071a1a)] text-white flex flex-col">
      {/*Menu*/}
      <header
        className="w-full flex justify-center p-[1.2rem] top-0 z-10 left-0 mx-auto fixed"
        style={{
          background: "linear-gradient(to right, #0e0e0e 70%, #142d2a)",
        }}
      >
        <div className="justify-between w-[80%] items-center flex">
          <div className="cursor-pointer">
            <p className="text-[#fea233] px-4 font-bold">MGFit</p>
          </div>

          <ul className="list-none flex">
            <li className="inline-block hover:text-[#d1790e] hover:font-bold font-[600] mr-[3rem] w-[60%] text-[1.8rem]">
              <Link href="#">Home</Link>
            </li>
            <li className="inline-block hover:text-[#d1790e] hover:font-bold font-[600] mr-[3rem] w-[60%] text-[1.8rem]">
              <Link href="#why-us">Features</Link>
            </li>
            <li className="inline-block hover:text-[#d1790e] hover:font-bold font-[600] mr-[3rem] w-[60%] text-[1.8rem]">
              <Link href="#explore">Explore</Link>
            </li>
            <li className="inline-block hover:text-[#d1790e] hover:font-bold font-[600] mr-[3rem] w-[60%] text-[1.8rem]">
              <Link href="#discount">Register</Link>
            </li>
          </ul>

          <div className="flex gap-6 items-center">
            <Link
              href="login"
              className="items-center px-[2.8rem] h-[4.8rem] hover:bg-[#a53d0d] hover:bg-opacity-50 rounded-lg text-[2rem] font-[600] text-white flex text-decoration-none"
            >
              Login
            </Link>

            <Link
              href="signup"
              className="px-[2.8rem] h-[4.8rem] rounded-xl text-[1.8rem] hover:bg-[#d1790e] bg-[#fea233] font-[600] text-white flex items-center"
            >
              Signup
            </Link>
          </div>
        </div>
      </header>
      {/*<!-- End Menu -->*/}

      {/*<!-- Header -->*/}
      <main className="mt-[7rem] h-screen overflow-y-scroll pb-[7rem]">
        <section className="landing-header flex justify-center">
          <div className="w-[80%] items-center flex">
            <div className="w-[60%]">
              <h1 className="mb-[3rem] text-[7rem] font-bold">
                Complete Daily <br />
                <span className="text-[#fea233]">Workout</span> At Home
              </h1>

              <p className="mb-[3rem]">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima
                sunt sed tempora neque molestiae corrupti nobis harum ullam eos
                nam!
              </p>

              <Link
                href="signup"
                className="w-fit px-[2.8rem] mt-[2rem] h-[4.8rem] rounded-xl text-[2rem] hover:bg-[#d1790e] bg-[#d1790e] font-medium text-white flex items-center"
              >
                Get Started Now
              </Link>
            </div>

            <div className="w-[40%]">
              <Image
                //src="https://raw.githubusercontent.com/programmercloud/pgc-gym/main/img/banner-img.png"
                src="/assets/images/bodybuild.png"
                alt=""
                className="w-full"
                width={340}
                height={340}
              />
            </div>
          </div>
        </section>
        {/*<!-- End Header -->*/}

        {/*<!-- Explore -->*/}
        <section
          className="bg-[#141615] py-[8rem] flex justify-center"
          id="why-us"
        >
          <div className="w-[80%] items-center flex gap-[3.2rem]">
            <div className="visual">
              <Image
                src="/assets/images/explore.jpg"
                alt=""
                className="p-[1.4rem] w-full"
                width={640}
                height={640}
                style={{}}
              />
            </div>
            <div className="w-[60%]">
              <h2 className="text-[3.5rem] font-bold mb-[3rem]">
                Explore Our Fitness <br />
                Studio
              </h2>
              <p className="text-[1.5rem] mb-[3rem]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis esse vitae ratione quos maiores eveniet temporibus
                illum! Eligendi amet officia unde sint totam ut optio.
                Molestiae, illo quia?
              </p>

              <Link
                href="signup"
                className="w-fit px-[2.8rem] mt-[2rem] h-[4.8rem] rounded-xl text-[2rem] hover:bg-[#d1790e] bg-[#d1790e] font-medium text-white flex items-center"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </section>
        {/*<!-- End Explore -->*/}

        {/*<!-- Trainer -->*/}
        <section
          className="bg-[#1d1f1e] text-center py-[8rem] flex justify-center"
          id="trainer"
        >
          <div className="w-[80%] items-center flex flex-col">
            {" "}
            <h2 className="text-[3.5rem] font-bold mb-[3rem]">
              Our Professional Trainers
            </h2>
            <div className="w-full items-center justify-between flex">
              <div className="mb-[2rem] flex gap-[1rem] justify-center flex-col">
                <Image
                  src="/assets/images/loveday.png"
                  alt=""
                  className="mb-10 outline-2 outline-white p-[1.4rem] w-[34rem]"
                  width={340}
                  height={340}
                  style={{
                    borderTopLeftRadius: "8rem",
                    borderTopRightRadius: "2rem",
                    borderBottomRightRadius: "8rem",
                    borderBottomLeftRadius: "2rem",
                    outline: "2px solid #fff",
                  }}
                />
                <h3 className="text-[2.5rem] font-bold">Alan Smith</h3>
                <p className="text-[1.5rem] w-[32rem]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nulla.
                </p>

                <Link
                  href="#"
                  className="text-[3.5rem] text-[#ccc] text-decoration-none "
                >
                  <RedoOutlinedIcon />
                </Link>
              </div>

              <div className="mb-[2rem] flex gap-[1rem] justify-center flex-col">
                <Image
                  src="/assets/images/loveday.png"
                  alt=""
                  className="mb-10 outline-2 outline-white p-[1.4rem] w-[34rem]"
                  width={340}
                  height={340}
                  style={{
                    borderTopLeftRadius: "8rem",
                    borderTopRightRadius: "2rem",
                    borderBottomRightRadius: "8rem",
                    borderBottomLeftRadius: "2rem",
                    outline: "2px solid #fff",
                  }}
                />
                <h3 className="text-[2.5rem] font-bold">Alan Smith</h3>
                <p className="text-[1.5rem] w-[32rem]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nulla.
                </p>

                <Link
                  href="#"
                  className="text-[3.5rem] text-[#ccc] text-decoration-none "
                >
                  <RedoOutlinedIcon />
                </Link>
              </div>

              <div className="mb-[2rem] flex gap-[1rem] justify-center flex-col">
                <Image
                  src="/assets/images/loveday.png"
                  alt=""
                  className="mb-10 outline-2 outline-white p-[1.4rem] w-[34rem]"
                  width={340}
                  height={340}
                  style={{
                    borderTopLeftRadius: "8rem",
                    borderTopRightRadius: "2rem",
                    borderBottomRightRadius: "8rem",
                    borderBottomLeftRadius: "2rem",
                    outline: "2px solid #fff",
                  }}
                />
                <h3 className="text-[2.5rem] font-bold">Alan Smith</h3>
                <p className="text-[1.5rem] w-[32rem]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nulla.
                </p>

                <Link
                  href="#"
                  className="text-[3.5rem] text-[#ccc] text-decoration-none "
                >
                  <RedoOutlinedIcon />
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/*<!-- End Trainer -->*/}
      </main>

      {/*<!-- Footer -->*/}
      <footer
        className="py-[2rem] border-y-2 border-solid border-white text-center fixed bottom-0 w-full justify-center flex"
        style={{
          background: "linear-gradient(to right, #0e0e0e 70%, #142d2a)",
        }}
      >
        <div className="w-[80%] items-center flex justify-between">
          <p className="text-[1.5rem]">
            Copyright &copy; © 2024 MG-Fit | All Rights Reserved Terms and
            Conditions | Privacy Policy
          </p>

          <Link
            href="#"
            className="py-[8px] px-[1.2rem] bg-white bg-opacity-70 rounded-lg shadow"
            target="__blank"
          >
            <p>Learn More</p>
          </Link>
        </div>
      </footer>
    </div>
  );
}
