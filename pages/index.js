import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import { IconButton } from "@mui/material";

import { useRouter } from "next/router";

export default function Home() {
  //const router = useRouter();
  return (
    <div className="bg-[radial-gradient(circle,_#f5f5f5,_#d4e1e1)] text-[#333] flex flex-col">
      {/*Menu*/}
      <header
        className="w-full flex justify-center py-[1.8rem] px-4 top-0 z-10 left-0 mx-auto fixed"
        style={
          {
            //background: "linear-gradient(to right, #6e6e6e, #a1a1a1)",
          }
        }
      >
        <div className="w-[80%] flex justify-between items-center">
          {/* Logo */}
          <div className="cursor-pointer">
            <p className="text-[#fea233] text-3xl font-bold">MGFit</p>{" "}
            {/* Adjusted font size for better visibility */}
          </div>

          {/* Navigation Links */}
          <ul className="list-none flex space-x-8">
            <li className="text-[1.8rem] font-semibold hover:text-[#fea233] hover:font-bold">
              <Link href="#">Home</Link>
            </li>
            <li className="text-[1.8rem] font-semibold hover:text-[#fea233] hover:font-bold">
              <Link href="#why-us">Blog</Link>
            </li>
            <li className="text-[1.8rem] font-semibold hover:text-[#fea233] hover:font-bold">
              <Link href="#explore">Team</Link>
            </li>
            <li className="text-[1.8rem] font-semibold hover:text-[#fea233] hover:font-bold">
              <Link href="#discount">Projects</Link>
            </li>
          </ul>

          {/* Authentication Links */}
          <div className="flex gap-4">
            <Link
              href="login"
              className="px-6 py-2 rounded-lg text-[1.8rem] font-semibold text-[#333] bg-white hover:bg-[#f0f0f0] flex items-center transition-colors"
            >
              Login
            </Link>

            <Link
              href="signup"
              className="px-6 py-2 rounded-lg text-[1.8rem] font-semibold text-white bg-[#fea233] hover:bg-[#e49300] flex items-center transition-colors"
            >
              Signup
            </Link>
          </div>
        </div>
      </header>

      {/*<!-- End Menu -->*/}

      {/*<!-- Header -->*/}
      <main className="mt-[7rem] h-screen overflow-y-scroll pb-[7rem]">
        <section className="landing-header bg-[#f5f5f5] flex justify-center">
          <div className="w-[80%] items-center flex sm:flex-row flex-col lg:p-0 py-[2rem]">
            <div className="lg:w-[60%] w-full">
              <h1 className="mb-[3rem] text-[7rem] font-bold leading-tight">
                Try out our
                <br />
                <span className="text-[#fea233]">Fitness</span> Tracker
              </h1>

              <p className="mb-[3rem]">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima
                sunt sed tempora neque molestiae corrupti nobis harum ullam eos
                nam!
              </p>

              <Link
                href="signup"
                className="w-fit px-[2.8rem] mt-[2rem] h-[4.8rem] rounded-xl text-[2rem] hover:bg-[#fea233] bg-[#fea233] font-medium text-white flex items-center"
              >
                Try it Now
              </Link>
            </div>

            <div className="w-[40%] lg:block hidden">
              <Image
                //src="https://raw.githubusercontent.com/programmercloud/pgc-gym/main/img/banner-img.png"
                src="/assets/images/bodybuild.png"
                alt="Bodybuilding"
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
          className="bg-[#fafafa] py-[8rem] flex justify-center"
          id="why-us"
        >
          <div className="w-[80%] items-center flex sm:flex-row flex-col gap-[3.2rem]">
            <div className="lg:w-auto w-full">
              <Image
                src="/assets/images/explore.jpg"
                alt="Explore"
                className="sm:p-[1.4rem] p-0 w-full"
                width={1020}
                height={640}
              />
            </div>
            <div className="sm:w-[60%] w-full">
              <h2 className="text-[3.5rem] font-bold mb-[3rem]">
                A Health Centric
                <br />
                Solution
              </h2>
              <p className="text-[1.5rem] mb-[3rem]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis esse vitae ratione quos maiores eveniet temporibus
                illum! Eligendi amet officia unde sint totam ut optio.
                Molestiae, illo quia?
              </p>

              <Link
                href="signup"
                className="w-fit px-[2.8rem] mt-[2rem] h-[4.8rem] rounded-xl text-[2rem] hover:bg-[#fea233] bg-[#fea233] font-medium text-white flex items-center"
              >
                Try it Now
              </Link>
            </div>
          </div>
        </section>
        {/*<!-- End Explore -->*/}

        {/*<!-- Trainer -->*/}
        <section
          className="bg-[#2e2e2e] text-center py-[8rem] flex justify-center"
          id="trainer"
        >
          <div className="w-[80%] items-center flex flex-col">
            {" "}
            <h2 className="text-[3.5rem] font-bold mb-[3rem] text-[#fea233]">
              What our users say
            </h2>
            <div className="w-full items-center justify-between flex sm:flex-row flex-col flex-wrap">
              <div className="mb-[2rem] flex gap-[1rem] justify-center flex-col">
                <Image
                  src="/assets/images/loveday.png"
                  alt="Trainer 1"
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
                <h3 className="text-[2.5rem] font-bold text-[#fea233]">
                  Alan Smith
                </h3>
                <p className="text-[1.5rem] w-[32rem] text-[#ccc]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nulla.
                </p>

                <Link
                  href="#"
                  className="text-[3.5rem] text-[#fea233] text-decoration-none "
                >
                  <RedoOutlinedIcon />
                </Link>
              </div>

              <div className="mb-[2rem] flex gap-[1rem] justify-center flex-col">
                <Image
                  src="/assets/images/loveday.png"
                  alt="Trainer 2"
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
                <h3 className="text-[2.5rem] font-bold text-[#fea233]">
                  Jane Doe
                </h3>
                <p className="text-[1.5rem] w-[32rem] text-[#ccc]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nulla.
                </p>

                <Link
                  href="#"
                  className="text-[3.5rem] text-[#fea233] text-decoration-none "
                >
                  <RedoOutlinedIcon />
                </Link>
              </div>

              <div className="mb-[2rem] flex gap-[1rem] justify-center flex-col">
                <Image
                  src="/assets/images/loveday.png"
                  alt="Trainer 2"
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
                <h3 className="text-[2.5rem] font-bold text-[#fea233]">
                  Jane Doe
                </h3>
                <p className="text-[1.5rem] w-[32rem] text-[#ccc]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nulla.
                </p>

                <Link
                  href="#"
                  className="text-[3.5rem] text-[#fea233] text-decoration-none "
                >
                  <RedoOutlinedIcon />
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/*<!-- End Trainer -->*/}

        {/*<!-- Footer -->*/}
        <footer className="bg-[#333] text-[#f5f5f5] py-[3rem] text-center">
          <p>© 2024 MGFit - All Rights Reserved</p>
        </footer>
        {/*<!-- End Footer -->*/}
      </main>
    </div>
  );
}
