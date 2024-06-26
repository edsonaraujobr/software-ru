import { PlusCircledIcon, FileTextIcon, EyeOpenIcon, Cross1Icon, CheckIcon} from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog'; 
import { Button } from '../../componentes/Button.jsx';
import { Header } from '../../componentes/Header.jsx'
import { useContext, useState } from "react"
import { ClerkContext } from '../../contexts/ClerkContext.jsx'; 
import { useNavigate } from 'react-router-dom';
import { ServiceContext } from '../../contexts/ServiceContext.jsx';

export function HomeClerk({children}) {
    const login = false;
    const [typeService, setTypeService] = useState('');
    const { clerk } = useContext(ClerkContext);
    const navigate = useNavigate()
    const { openService } = useContext(ServiceContext);

    const handleTypeService = (e) => {
        setTypeService(e.target.value)
    };

    const handleStartedService = async (event) => {
        event.preventDefault();

        try {
            const date = new Date().toISOString();
            const response = await fetch("http://localhost:3030/atendimento", {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify( {date, type_service: typeService.toUpperCase(), id_clerk:clerk.id} )
            });

            if(response.ok) {
                const data = await response.json();
                navigate(`/atendente/${typeService}`)
                openService(data.id)
            } else {
                alert("erro!")
            }
        } catch(error) {
            console.error("Erro ao conectar ao servidor", error);
        }

    } 

    const handleClickSettings = () => {
        navigate("/configuracoes")
    }

    return (
        login ? children : ( 
            <Dialog.Root>
                <div className='flex flex-col bg-slate-800 w-lvw h-lvh text-white gap-4'>
                    <Header
                        name={clerk.name}
                        linkPhoto={clerk.photo}
                        onClickedSettings={handleClickSettings}
                    />

                    <div className='flex'>
                        <div className='flex gap-2 px-10 justify-end w-full'>
                            <input type="search" className='bg-slate-900 rounded-md p-1 font-light ' placeholder='Pesquise atendimentos...' />
                            <Dialog.Trigger>
                                <Button
                                    color='bg-green-700'
                                    text='Novo Atendimento'
                                    hover='bg-green-900'
                                    icon={<PlusCircledIcon/>}
                                    
                                />
                            </Dialog.Trigger>
                            <Dialog.Portal>
                                <Dialog.Overlay className='inset-0 fixed bg-black/70'/>
                                <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:max-w-[640px] w-[15vw] md:h-[35vh] bg-slate-700 md:rounded-md flex flex-col outline-none'>
                                    <Dialog.Close className='absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
                                        <Cross1Icon/>
                                    </Dialog.Close>
                                    <form onSubmit={handleStartedService} className='flex w-full h-full justify-center items-center text-white'>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex gap-2 flex-col'>
                                                <h2 className='font-bold'>Tipo de refeição</h2>
                                                <div className='flex gap-2'>
                                                    <input type="radio" name="refeicao" id="id-cafe-manha" value="cafe" onChange={handleTypeService} required />
                                                    <label htmlFor="id-cafe-manha">Café da manhã</label>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <input type="radio" name="refeicao" id="id-almoco" value="almoco" onChange={handleTypeService} required/>
                                                    <label htmlFor="id-almoco">Almoço</label>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <input type="radio" name="refeicao" id="id-jantar" value="jantar" onChange={handleTypeService} required />
                                                    <label htmlFor="id-jantar">Jantar</label>
                                                </div>
                                            </div>
                                            <button 
                                                type="submit"
                                                className='w-full bg-green-600 rounded-md hover:bg-green-700'
                                            >
                                                Iniciar
                                            </button>
                                        </div>
                                        
                                    </form>
                                </Dialog.Content>
                            </Dialog.Portal>
                        </div>
                    </div>

                    
                    <div className='flex flex-col gap-3 px-10'>
                        <h2 className='text-2xl'>Ultimos Atendimentos</h2>
                        
                        <div className='flex flex-col w-full gap-2'>
                            <div className='flex p-4 justify-between items-center bg-slate-900'>
                                <div className='flex flex-col'>
                                    <h1 className='font-bold'>Almoço</h1>
                                    <span className='font-light text-sm'>27 de maio de 2024</span>
                                    <span className='font-light text-sm'>314 clientes atendidos</span>
                                </div>
                                <div className='flex flex-col justify-center gap-2
                                '>
                                    {/* <Button
                                        cor='bg-slate-950'
                                        texto='Imprimir relatório'
                                        icone={<FileTextIcon/>}
                                    /> */}
                                    <Button
                                        color='bg-slate-950'
                                        text='Visualizar relatório'
                                        icon={<EyeOpenIcon/>}
                                    />
                                </div>
                            </div>

                            <div className='flex p-4 justify-between items-center bg-slate-900'>
                                <div className='flex flex-col'>
                                    <h1 className='font-bold'>Almoço</h1>
                                    <span className='font-light text-sm'>27 de maio de 2024</span>
                                    <span className='font-light text-sm'>314 clientes atendidos</span>
                                </div>
                                <div className='flex flex-col justify-center gap-2
                                '>
                                    {/* <Button
                                        cor='bg-slate-950'
                                        texto='Imprimir relatório'
                                        icone={<FileTextIcon/>}
                                    /> */}
                                    <Button
                                        color='bg-slate-950'
                                        text='Visualizar relatório'
                                        icon={<EyeOpenIcon/>}
                                    />
                                </div>
                            </div>

                            <div className='flex p-4 justify-between items-center bg-slate-900'>
                                <div className='flex flex-col'>
                                    <h1 className='font-bold'>Almoço</h1>
                                    <span className='font-light text-sm'>27 de maio de 2024</span>
                                    <span className='font-light text-sm'>314 clientes atendidos</span>
                                </div>
                                <div className='flex flex-col justify-center gap-2
                                '>
                                    {/* <Button
                                        cor='bg-slate-950'
                                        texto='Imprimir relatório'
                                        icone={<FileTextIcon/>}
                                    /> */}
                                    <Button
                                        color='bg-slate-950'
                                        text='Visualizar relatório'
                                        icon={<EyeOpenIcon/>}
                                    />
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </Dialog.Root>
        )
    )
}