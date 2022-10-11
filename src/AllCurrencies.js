const AllCurrencies = ({currency,showDetailsCurrency}) => {

     const showDetails = ()=>{
        showDetailsCurrency(currency.id)
     }

    return (  
        <div className="crypto">
            <img src={currency.image.large}/>
            <h3>{currency.id}</h3>
            <button onClick={showDetails}>Show</button>
        </div>
    )
}

export default AllCurrencies;