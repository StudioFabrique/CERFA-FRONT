import { useNavigate } from 'react-router-dom'
import AuthentificationImage from '../assets/authentification.png'
import { useState } from 'react'
import authService from '../services/auth-service';
import { Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast';

export function Authentification(){
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };
    
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if(email && password){
            try {
                const result = await authService.login(email, password, rememberMe)
                if(result == true){
                    const user =  JSON.parse(localStorage.getItem('user') || 'null');
                    if(user.role == 1){
                        // navigate(`/accueil-${role.split("_")[1]}`)
                        navigate(`/accueil-cerfa`)
                    }
                    else if(user.role == 2 ){
                        navigate("/accueil-employeur")
                    }
                    else if(user.role == 3){
                        navigate("/accueil-admin")
                    }
                    toast.success("Vous êtes connectés !")
                }
            }
            catch (error){
                console.log("Login failed: ", error)
            }
       
        }
    };
    return(
        <div className='flex justify-center mt-20'>
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 w-[30%] m-20">
                <div className="p-4 sm:p-7 mt-3">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400 text-xl">
                            Don't have an account yet?
                            <a className="text-blue-600 decoration-2 hover:underline text-xl font-medium dark:text-blue-500" href="../examples/html/signup.html">
                            Sign up here
                            </a>
                        </p>
                    </div>

                    <div className="mt-5">
                    

                    <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">Or</div>
                    <form onSubmit={handleLogin}>
                        <div className="grid gap-y-4">
                        <div className='mt-5'>
                            <label className="block text-xl mb-2 dark:text-white">Email address</label>
                            <div className="relative">
                            <input type="email" id="email" name="email" className="py-3 px-4 block w-full border-gray-200 border-2 rounded-lg text-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="email-error"  value={email}  onChange={(e) => setemail(e.target.value)}/>
                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                </svg>
                            </div>
                            </div>
                            <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                        </div>
                        <div className='mt-5'>
                            <div className="flex justify-between items-center">
                            <label className="block text-xl mb-2 dark:text-white">Password</label>
                            <a className="text-md text-blue-600 decoration-2 hover:underline font-medium" href="../examples/html/recover-account.html">Forgot password?</a>
                            </div>
                            <div className="relative">
                                        <input type={showPassword ? "text" : "password"} id="password" name="password" className="py-3 px-4 block border-2 w-full border-gray-200 rounded-lg text-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="password-error" value={password} onChange={(e) => setpassword(e.target.value)} />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                                            {showPassword ? <EyeOff className="h-6 w-6 text-gray-500" /> : <Eye className="h-6 w-6 text-gray-500" />}
                                        </div>
                                    </div>
                            <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                        </div>
                        
                        <div className="flex items-center mt-5">
                            <div className="flex">
                            <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" onClick={toggleRememberMe}/>
                            </div>
                            <div className="ms-3">
                            <label  className="text-md dark:text-white ">Remember me</label>
                            </div>
                        </div>
                    

                        <button type="submit" className="w-full text-xl mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Sign in</button>
                        </div>
                    </form>
                
                    </div>
                </div>
            </div>
            <img src={AuthentificationImage} className=' w-[35%] h-[80%] rounded-[25px] pl-5 '></img>
        </div>





        /* // <div className="flex px-20 py-10 h-screen">
        //     <div className='w-[15%]'></div>
        //     <form className='  pt-10 w-[40%] pb-5' onSubmit={handleLogin}>
        //         <img className="pl-20 w-[90%]" src={Cerfa}></img>
        //         <p className='font-bold text-2xl pl-20 pt-10'>Connectez-vous à votre espace</p>
        //         <p className='pt-8 text-xl pl-16'>Saisissez votre adresse mail et votre mot de passe</p>
        //         <div className=' pt-6 h-[8%] pl-8'>
        //             <input type='text' placeholder='Adresse mail' className='pl-5 ml-8 p-3 border-2 text-md rounded-xl w-[90%] ' id="email" value={email} name="email" onChange={(e) => setemail(e.target.value)}></input>
        //         </div>
        //         <div className=' pt-7 h-[8%] pl-8'>
        //             <input type='text' placeholder='Mot de passe' className='pl-5 p-3 ml-8 border-2 text-md rounded-xl w-[90%] ' id="password" value={password} name="password" onChange={(e) => setpassword(e.target.value)}></input>
        //         </div>
        //         <div className=' pt-9 h-[8%] pl-8'>
        //             <button   type="submit" className='p-4 border-2 text-lg text-white bg-black ml-8 rounded-xl w-[90%]'>Se connecter</button>
        //         </div>
        //         <div className='mt-8 w-[90%]  pb-10 flex justify-between'>
        //             <p></p>
        //             <a className='hover:font-bold ' href='/'>Mot de passe oublier ?</a>
        //         </div>
        //     </form>
        //     <img src={AuthentificationImage} className=' w-[40%] h-[100%] rounded-[25px] pl-5 '></img>
        //     <div className='w-[10%]'></div>
        // </div> */ 
    )
}