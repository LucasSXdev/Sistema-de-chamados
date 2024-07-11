interface TitleProps {
    children: React.ReactNode;
    name: string;
  }
  
export default function Title({children,name}:TitleProps){
    return(
        <div className="title" >
            {children}
            <span>{name}</span>
        </div>
    )
}