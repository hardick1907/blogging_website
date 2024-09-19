 import './post.css'
export  default function Post() {
    return (
        <div className="post">
            <div className="image"><img src="https://i.pinimg.com/564x/2b/6c/2a/2b6c2af0b759e1277d29b1be0807c4e3.jpg" alt="" /></div>
            <div className="texts">
                <h2>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h2>
                <p className="info">
                    <a href='#' className='author'>Hardick Bhadauria</a>
                    <time>20-09-2024 01:48</time>
                </p>
                <p className='summary'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry standard dummy text ever since the 1500s</p>
            </div>
            

        </div>
    )
}