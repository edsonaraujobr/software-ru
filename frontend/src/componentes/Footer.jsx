import logo from "../assets/logo.png";

export function Footer() {
    return (
        <footer className="flex w-lvw p-5 justify-between px-10 items-center gap-5 text-xs text-gray-500">
            <div className="flex items-center gap-2">
                <img src={logo} className="size-5" />
                <span>Próximo - Todos os direitos reservados</span>
            </div>
            <div className="flex gap-2">
                <a href="#" className="hover:underline">Suporte</a>
                <a href="#" className="hover:underline">Termos</a>
                <a href="#" className="hover:underline">Documentação</a>
            </div>
        </footer>
    )
}