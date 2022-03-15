export default async function (fragetyp, fraga) {
    return `<div class="accordion-item">
    <h2 class="accordion-header" id="${await fragetyp.id}">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${await fragetyp.id}" aria-expanded="false" aria-controls="collapse-${await fragetyp.id}">
    ${await fragetyp.title}</button>
    </h2>
    <div id="collapse-${await fragetyp.id}" class="accordion-collapse collapse" aria-labelledby="${await fragetyp.id}" data-bs-parent="#checklistItems">
<div class="accordion-body">
<div class="checklistTable" style="margin-top: 4em;">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Kontrollpunkter</th>
        <th scope="col">Önskat resultat</th>
        <th scope="col">Ja/Nej</th>
        <th scope="col">Notering</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
    ${fraga}
    </tbody>
  </table>
</div>
</div>
    </div>
  </div>
`;
}