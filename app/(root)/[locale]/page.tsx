"use client";
import "@/styles/globals.scss";
import { WelcomeForm } from "@components/home";
import { Container } from "@components/shared";

export default function HomePage() {
  return (
    <div className="home page--center">
      <Container>
        <WelcomeForm />
      </Container>
    </div>
  );
}
