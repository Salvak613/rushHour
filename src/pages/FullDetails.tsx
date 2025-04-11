import { WantedGuysContext } from "../context/WantedGuysContext";
import React, { useContext } from "react";
import styles from "./FullDetails.module.css"; // Assuming you have a CSS module for styling
import {useParams} from "react-router"

const FullDetails: React.FC = () => {
  const { data: wantedGuys } = useContext(WantedGuysContext);
  const { id } = useParams()
  const selectedGuy = wantedGuys.find((guy) => guy.id === id);

//  if (!wantedGuys || wantedGuys.length === 0) {
//    return <div className={styles.wrapper}>No details available</div>;
//  }

 // const [selectedGuy] = wantedGuys;

//  if (!selectedGuy) {
//    return <div className={styles.wrapper}>No details available</div>;
//  }

  if (!selectedGuy) {
    return <div>No details available for this ID.</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.stamp}>CONFIDENTIEL</div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image */}
          <div className="flex-1">
            {selectedGuy.image ? (
              <img src={selectedGuy.image} alt="Mugshot" className={styles.image} />
            ) : (
              <div className="italic text-gray-500">Aucune photo disponible</div>
            )}
            <p className="mt-2 text-xs text-gray-500 italic"> <a href={selectedGuy.profileURl} target="_blank" className="underline">Voir le dossier complet</a></p>
          </div>

          {/* Infos principales */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-1 uppercase">{selectedGuy.title}</h1>
            <p className="text-gray-700 mb-2"><strong>Description</strong> : {selectedGuy.description}</p>
            <div>
  <strong>Alias :</strong> {Array.isArray(selectedGuy.aliases) ? selectedGuy.aliases.join(" / ") : selectedGuy.aliases || "Aucun"}
</div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><strong>Sexe :</strong> {selectedGuy.sex}</div>
              <div><strong>Race :</strong> {selectedGuy.race}</div>
              <div><strong>Cheveux :</strong> {selectedGuy.hair}</div>
              <div><strong>Âge :</strong> {selectedGuy.age_range}</div>
              <div><strong>Statut :</strong> {selectedGuy.status}</div>
              <div><strong>Reward :</strong> {selectedGuy.reward_text || "Non spécifié"}</div>
              <div className="col-span-2">
  <strong>Dates de naissance utilisées :</strong>{" "}
  {Array.isArray(selectedGuy.datesOfBirthUsed)
    ? selectedGuy.datesOfBirthUsed.join(", ")
    : selectedGuy.datesOfBirthUsed || "Aucune"}
</div>
              <div className="col-span-2"><strong>Types de crime :</strong> {selectedGuy.types.join(", ")}</div>
              <div className="col-span-2"><strong>Bureaux en charge :</strong> {selectedGuy.fieldOffices.join(", ")}</div>
            </div>
          </div>
        </div>

        {/* Warning */}
        {selectedGuy.warningMessage && (
          <div className={styles.redBox}>
            <h2 className="text-red-700 font-bold text-lg mb-2">⚠️ ATTENTION</h2>
            <p>{selectedGuy.warningMessage}</p>
          </div>
        )}

        {/* Détails */}
<div className={styles.detailsBox}>
  <h2 className="text-xl font-semibold mb-2">Détails du dossier</h2>
  <div
    className="text-justify"
    dangerouslySetInnerHTML={{ __html: selectedGuy.details }}
  />
</div>

        {/* Easter egg 👀 */}
        <p className="text-xs text-gray-400 mt-6 italic text-center select-none">
          ◉ Dossier généré par "Project **** CODE SCHOOL" - Réservé au personnel clearance 7 ou plus.
          <br />Entrez MDP sur moniteur pour accéder au terminal privé. 
        </p>
      </div>
    </div>
  );
}



export default FullDetails;