import React from "react";
import { render, waitForElement } from "@testing-library/react";
import FightActions from "./FightActions";
import "@testing-library/jest-dom/extend-expect";
import { PlayerContextProvider } from "../../playerState";
import { EncounterContextProvider } from "../../encounterState";
import { BrowserRouter as Router } from "react-router-dom";
import {
  StateContext as NPCcontext,
  DispatchContext as NPCdispatchContext,
} from "../../encounterState";

describe("FightActions", () => {
  it("should render", () => {
    render(
      <Router>
        <PlayerContextProvider>
          <EncounterContextProvider>
            <FightActions />
          </EncounterContextProvider>
        </PlayerContextProvider>
      </Router>
    );
  });

  it("name this test", async () => {
    const { getByText } = render(
      <Router>
        <PlayerContextProvider>
          <NPCdispatchContext.Provider value={{ attack: () => {} }}>
            <NPCcontext.Provider
              value={{
                isLoading: false,
                npc: {
                  location: "Forest",
                  name: "Goblin",
                  health: 5,
                  attack: 3,
                  defense: 2,
                  options: [
                    {
                      name: "Fight",
                      type: "aggressive",
                    },
                    {
                      name: "Talk",
                      type: "passive",
                    },
                  ],
                },
              }}
            >
              <FightActions />
            </NPCcontext.Provider>
          </NPCdispatchContext.Provider>
        </PlayerContextProvider>
      </Router>
    );

    const awaitedText = await waitForElement(() => getByText("Attack"));
    expect(awaitedText).toBeInTheDocument();
  });
});
