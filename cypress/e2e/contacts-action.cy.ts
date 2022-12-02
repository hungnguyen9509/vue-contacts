/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

import { Contact } from "../models/Contact";
describe("Testing contacts app actions", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
    cy.login(Cypress.env("email"), Cypress.env("password"));
  });

  afterEach(() => {
    cy.logout();
  });

  it("can add new contacts", () => {
    // navigate to create contact form
    cy.dataCy("create-contact").click();

    // input data and save
    cy.get("#name").type("test contact");
    cy.get("#email").type("test.contact@gmail.com");
    cy.get("#phone_0").type("01234569999");
    cy.get("#birthday").type("1995-10-12");
    cy.get("input[type=file]").selectFile("cypress/fixtures/avatar.webp", {
      force: true,
      action: "select",
    });
    cy.get("#save").click();

    // verify create contact
    cy.get('[data-cy="ContactItem-0"]').within(() => {
      cy.get('[data-cy="contact-name"]').should("have.text", "test contact");
      cy.get('[data-cy="contact-phone"]').should("have.text", "01234569999");
      cy.get('[data-cy="contact-email"]').should(
        "have.text",
        "test.contact@gmail.com"
      );
      cy.get('[data-cy="contact-avatar"]').should(
        "have.attr",
        "alt",
        "avatar test contact"
      );
    });
  });

  it("can delete contact", () => {
    cy.get('[data-cy="delete"]').click();
    cy.get('[data-cy="confirm"]').click();
    cy.get('[data-cy="ContactItem-0"]').should("not.exist");
  });

  it("can edit contact", () => {
    const contact = {
      name: "test contact",
      email: "test.contact@email.com",
      phone: [{ number: "01234569999" }],
      birthday: "1995-10-12",
      avatar: "cypress/fixtures/avatar.webp",
    };

    // navigate to create contact form
    cy.dataCy("create-contact").click();

    // input data and save
    cy.get("#name").type(contact.name);
    cy.get("#email").type(contact.email);
    cy.get("#phone_0").type(contact.phone[0].number);
    cy.get("#birthday").type(contact.birthday);
    cy.get("input[type=file]").selectFile(contact.avatar, {
      force: true,
      action: "select",
    });
    cy.get("#save").click();

    // update contact
    Object.assign(contact, {
      name: "test contact edit",
      email: "test.contact.edit@gmail.com",
      phone: [{ number: "01234569998" }],
      birthday: "1995-10-13",
      avatar: "cypress/fixtures/avatar2.webp",
    });

    // navigate to edit
    cy.get('[data-cy="edit"]').click();

    // editing
    cy.get("#name").clear().type(contact.name);
    cy.get("#email").clear().type(contact.email);
    cy.get("#phone_0").clear().type(contact.phone[0].number);
    cy.get("#birthday").clear().type(contact.birthday);
    cy.get("input[type=file]").selectFile(contact.avatar, {
      force: true,
      action: "select",
    });
    cy.get("#save").click();

    // verify create contact
    cy.get('[data-cy="ContactItem-0"]').within(() => {
      cy.get('[data-cy="contact-name"]').should("have.text", contact.name);
      cy.get('[data-cy="contact-phone"]').should(
        "have.text",
        contact.phone[0].number
      );
      cy.get('[data-cy="contact-email"]').should("have.text", contact.email);
      cy.get('[data-cy="contact-avatar"]').should(
        "have.attr",
        "alt",
        `avatar ${contact.name}`
      );
    });

    cy.resetDB();
  });

  it("can search contact by email, number and name", () => {
    const contacts: Partial<Contact>[] = [
      {
        name: "aang",
        email: "aang@gmail.com",
        phone: [{ number: "01234560000", type: "Mobile" }],
        birthday: "1995-01-01",
        avatar:
          "http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp",
      },
      {
        name: "zuko",
        email: "zuko@gmail.com",
        phone: [{ number: "01234560001", type: "Mobile" }],
        birthday: "1995-01-02",
        avatar:
          "http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp",
      },
      {
        name: "katara",
        email: "katara@gmail.com",
        phone: [{ number: "01234560002", type: "Mobile" }],
        birthday: "1995-01-03",
        avatar:
          "http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp",
      },
    ];
    cy.initDB(contacts);
    cy.reload();

    cy.get('[data-cy="search-bar"]').type(contacts[0].name);
    cy.wait(300);

    cy.get('[data-cy="ContactItem-0"]', { timeout: 1000 }).within(() => {
      cy.get('[data-cy="contact-name"]').should("have.text", contacts[0].name);
      cy.get('[data-cy="contact-phone"]').should(
        "have.text",
        contacts[0].phone[0].number
      );
      cy.get('[data-cy="contact-email"]').should(
        "have.text",
        contacts[0].email
      );
      cy.get('[data-cy="contact-avatar"]').should(
        "have.attr",
        "alt",
        `avatar ${contacts[0].name}`
      );
    });

    cy.get('[data-cy="search-bar"]').clear().type(contacts[1].phone[0].number);
    cy.wait(300);

    cy.get('[data-cy="ContactItem-0"]').within(() => {
      cy.get('[data-cy="contact-name"]').should("have.text", contacts[1].name);
      cy.get('[data-cy="contact-phone"]').should(
        "have.text",
        contacts[1].phone[0].number
      );
      cy.get('[data-cy="contact-email"]').should(
        "have.text",
        contacts[1].email
      );
      cy.get('[data-cy="contact-avatar"]').should(
        "have.attr",
        "alt",
        `avatar ${contacts[1].name}`
      );
    });

    cy.get('[data-cy="search-bar"]').clear().type(contacts[2].email);
    cy.wait(300);

    cy.get('[data-cy="ContactItem-0"]').within(() => {
      cy.get('[data-cy="contact-name"]').should("have.text", contacts[2].name);
      cy.get('[data-cy="contact-phone"]').should(
        "have.text",
        contacts[2].phone[0].number
      );
      cy.get('[data-cy="contact-email"]').should(
        "have.text",
        contacts[2].email
      );
      cy.get('[data-cy="contact-avatar"]').should(
        "have.attr",
        "alt",
        `avatar ${contacts[2].name}`
      );
    });

    cy.resetDB();
  });
});
