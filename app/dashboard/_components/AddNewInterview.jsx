"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function AddNewInterview() {
  const [openDailog, setOpenDailog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDailog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDailog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Tell us more about your job interviwing
            </DialogTitle>
            <DialogDescription>
              <form>
                <div>
                  <h2>
                    Add Details about your job position/role,Job description and
                    year of experience{" "}
                  </h2>
                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input placeholder="Ex. Full Stack Developer" required />
                  </div>
                  <div className="my-3">
                    <label>Job Description/ Tech stack (In Short)</label>
                    <Textarea
                      placeholder="Ex. React , Node, MongoDB"
                      required
                    />
                  </div>
                  <div className=" my-3">
                    <label>Years Of Experience</label>
                    <Input placeholder="EX.5" type="number" max={50} required />
                  </div>
                </div>
              </form>
              <div className="flex gap-5 justify-end">
                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={() => setOpenDailog(false)}
                >
                  Cancel
                </Button>
                <Button type="button">Start Interview</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
