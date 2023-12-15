"use client";
import { Button } from "@nextui-org/react";
import React from "react";
import toast from "react-hot-toast";
import { useToast } from "@/components/ui/use-toast";

interface StatsPageProps {}

const StatsPage: React.FC<StatsPageProps> = () => {
  const { toast: anotherToast } = useToast();
  const showToastSuccess = () => {
    toast.success("Success message");
    anotherToast({
      title: "Success",
      description: "Success message",
      variant: "success",
    });
  };

  const showToastError = () => {
    toast.error("Error message");
    anotherToast({
      title: "Error",
      description: "Error message",
      variant: "destructive",
    });
  };

  const showToastWithPromise = () => {
    const promise = new Promise((resolve, reject) => {
      // Simulate a promise that resolves after 5 seconds
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.5) {
          resolve("Promise resolved successfully!");
        } else {
          reject("Promise failed!");
        }
      }, 5000);
    });

    toast.promise(promise, {
      loading: "Loading...",
      success: (data) => `Success: ${data}`,
      error: (error) => `Error: ${error}`,
    });
  };

  return (
    <>
      <div>
        <Button
          type="button"
          color="success"
          onClick={showToastSuccess}>
          Test Success
        </Button>
        <Button
          type="button"
          color="danger"
          onClick={showToastError}>
          Test Error
        </Button>
        <Button
          type="button"
          color="secondary"
          onClick={showToastWithPromise}>
          Test Promise
        </Button>
      </div>
    </>
  );
};

export default StatsPage;
