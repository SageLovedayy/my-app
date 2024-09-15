import Layout from "@/components/layout";
import { Input } from "@mui/material";
import exercises from "@/public/assets/data/exercises.json";

export default function Dashboard() {
  console.log(exercises);
  return (
    <Layout>
      <div className="relative">
        <div className="settings-body">
          <div className="flex-col flex gap-[3.2rem]">
            <Input
              sx={{
                fontSize: "1.6rem",
                fontFamily: "clash",
                color: "black",
                backgroundColor: "transparent",
                //border: "none",
                boxShadow: "none",
              }}
              className="w-[32rem] py-2 border-solid border-black border-[1.5px] px-6 text-[1.6rem] text-red rounded-xl bg-white bg-opacity-80 backdrop-blur-[2rem]"
              placeholder="Old Password"
              //value={oldPasscode}
              //onChange={(e) => setOldPasscode(e.target.value)}
            />

            <div className="flex gap-[3.2rem] sm:flex-row flex-col sm:items-center items-start">
              {" "}
              <Input
                sx={{
                  fontSize: "1.6rem",
                  fontFamily: "clash",
                  color: "black",
                  backgroundColor: "transparent",
                  //border: "none",
                  boxShadow: "none",
                }}
                className="w-[32rem] py-2 border-solid border-black border-[1.5px] px-6 text-[1.6rem] text-red rounded-xl bg-white bg-opacity-80 backdrop-blur-[2rem]"
                placeholder="New Password"
                //value={oldPasscode}
                //onChange={(e) => setOldPasscode(e.target.value)}
              />
              {/*<SearchBar
                searchIcon={false}
                width="[33.1rem]"
                height="[4.2rem]"
                placeholder="New Password"
                textWidth="[26rem]"
                className="black-border settings-input"
                textClass="user-search-text"
              />*/}
              <button className="text-white bg-black p-4 rounded-lg text-[1.6rem] font-normal font-['clash'] shadow">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
