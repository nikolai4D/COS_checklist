export const Librarian = {
    checklist: { type: "checklist" }, question: { type: "question" }, address: { type: "address" }, answer: {
        type: "answer", possibleAnswers: [
            { sv: "Ja", eng: "Yes" },
            { sv: "Nej", eng: "No" },
            { sv: "Ej tillämpbar", eng: "N/A" }
        ]
    },
    status: [
        { sv: "Godkänd", eng: "Approved" },
        { sv: "Ej godkänd", eng: "Not approved" },
        { sv: "Påbörjad", eng: "In progress" }
    ]
};