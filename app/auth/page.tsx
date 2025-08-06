"use client";

import { LakshdweepData as data } from "./data";
import "@/styles/page.scss";
import { useSearchParams } from "next/navigation";

import SignupForm from "@/components/LakshDweep/AccountCreation/SignupForm";

import PageFormat from "@/components/LakshDweep/pageFormat";
import CaptchaLoad from "@/components/captcha-load";
import { Card } from "@/components/ui/card";
import UnifiedSignupForm from "./UnifiedSignupForm";
import LoginForm from "@/components/LakshDweep/Login";

export default function LoginPage() {
  const params = useSearchParams();
  const role = params.get("user");
  const formToRender = params.get("form");
  return (
    <PageFormat textDirection="left" className="" backgroundImgUrl="none">
      <div className="items-center md:flex md:flex-row md:justify-between ">
        <div className="page-text relative   md:w-1/2 ">
          <div className="w-[600px] max-w-full">
            <h1 className="text-start text-5xl font-bold leading-[60px] text-white">
              {data.heading}
            </h1>
            <hr className="my-10" />
            <div className="flex flex-col gap-4 text-white">
              <p className="text-xl font-semibold">
                Book safe, official passenger ferries to every island in
                minutes.
              </p>
            </div>
          </div>
        </div>

        <div className="relative top-10 flex place-content-center items-center pb-24  md:w-1/2 md:pb-0">
          <div className="max-h-[150vh] w-full max-w-[500px]">
            <Card className="w-full">
              {!role ? (
                formToRender ? (
                  <SignupForm />
                ) : (
                  <LoginForm />
                )
              ) : (
                <UnifiedSignupForm />
              )}
            </Card>
          </div>
        </div>
      </div>

      <CaptchaLoad />
    </PageFormat>
  );
}
