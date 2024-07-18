

export function FormulaireEmail(){
    return <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center border-2 w-[40%] rounded-l shadow-md'>
                <p className='text-center font-bold text-2xl pt-10'>Veuillez rentrez les collaborateurs de ce contrat :</p>
                <p className='text-xl pt-20'>L'email de l'Étudiant </p>
                <input className='border-2 rounded-l content-center mt-7 text-center w-[50%]' placeholder='exemple@exemple.com'></input>
                <p className='text-xl pt-20'>L'email de l'Entreprise</p>
                <input className='border-2 rounded-l mt-7 text-center w-[50%] mb-40 ' placeholder='exemple@step.fr'></input>
            </div>
        </div>
}