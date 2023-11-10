export default function Input({tipo, value, onChange, placeholder, classnames, ...props}) {

    return (<>
        <div>
            <input type={tipo} {...props} />
        </div>
    </>)
}