/// <reference types="cypress" />

import { signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { Contact } from "../models/Contact";
import { auth, db } from "./firebase";

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<Element>>;

      /**
       * Command to login
       * @param email user's email
       * @param password user's password
       */
      login(email: string, password: string): Chainable<void>;

      /**
       * Command to logout
       */
      logout(): Chainable<void>;

      /**
       * Command to reset database
       */
      resetDB(): Chainable<void>;

      /**
       * Command to init database
       */
      initDB(contacts: Partial<Contact>[]): Chainable<void>;
    }
  }
}

Cypress.Commands.add("dataCy", (value: string) => {
  return cy.get(`[data-cy="${value}"]`);
});

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.wrap(signInWithEmailAndPassword(auth, email, password)).then(() => {
    cy.visit("/");
  });
});

Cypress.Commands.add("logout", () => {
  cy.dataCy("avatar").click();
  cy.dataCy("Logout").click();
});

Cypress.Commands.add("resetDB", () => {
  const userId = auth.currentUser.uid;
  const promises: Promise<void>[] = [];
  getDocs(collection(db, `users/${userId}/contacts`)).then((docs) => {
    docs.forEach((doc) => promises.push(deleteDoc(doc.ref)));

    Promise.all(promises);
  });
});

Cypress.Commands.add("initDB", (contacts: Partial<Contact>[]) => {
  const userId = auth.currentUser.uid;
  try {
    const promises: Promise<void>[] = [];
    contacts.forEach((contact) => {
      const docRef = doc(collection(db, `users/${userId}/contacts`));
      contact.id = docRef.id;
      promises.push(setDoc(docRef, contact));
    });

    Promise.all(promises);
  } catch (error) {
    cy.log(error.message);
  }
});
