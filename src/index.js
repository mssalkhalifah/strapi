"use strict";

const { forEach } = require("../config/middlewares");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const stackUID = "api::stack.stack";

    let stacks = [
      {
        title: "OutSystems",
        uuid: "36d52e9d-9c40-441a-89ea-8926799189bd",
        color: "#db2400",
        url: "https://www.outsystems.com/",
      },
      {
        title: "React",
        uuid: "72152238-0386-427c-af67-fab8c9c5ed8e",
        color: "#61dbfb",
        url: "https://react.dev/",
      },
      {
        title: "NodeJS",
        uuid: "cfb821fa-f1c9-442f-80ff-8f877cc8cf96",
        color: "#3c873a",
        url: "https://nodejs.org/en",
      },
      {
        title: "NextJS",
        uuid: "456d183a-a5c0-4dc3-816a-6de93cca6d6b",
        color: "#000",
        url: "https://nextjs.org/",
      },
      {
        title: ".NET",
        uuid: "a4c9f3bb-2c5c-41ac-a75f-55de173b8e6e",
        color: "#512BD4",
        url: "https://dotnet.microsoft.com/en-us/",
      },
      {
        title: "PostgreSQL",
        uuid: "8acf84c2-af2a-4dda-b848-4abce7174ab8",
        color: "#336791",
        url: "https://dotnet.microsoft.com/en-us/",
      },
    ];

    const fetchedStacks = await strapi.entityService.findMany(
      "api::stack.stack"
    );

    // Find existing item, update it and remove it from the predefined list
    for (const element of fetchedStacks) {
      const item = stacks.find((stack) => stack.uuid === element.uuid);

      await strapi.entityService.update(stackUID, element.id, {
        data: {
          name: item.title,
          uuid: item.uuid,
          color: item.color,
          url: item.url,
          publishedAt:
            element.publishedAt === null
              ? new Date().toISOString()
              : element.publishedAt,
        },
      });

      stacks = stacks.filter((stack) => stack.uuid !== element.uuid);
    }

    console.log("New stacks\n", stacks);

    for (const stack of stacks) {
      await strapi.entityService.create("api::stack.stack", {
        data: {
          name: stack.title,
          uuid: stack.uuid,
          color: stack.color,
          url: stack.url,
        },
      });
    }
  },
};
