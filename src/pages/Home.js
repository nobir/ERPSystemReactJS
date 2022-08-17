import useErrorMessage from "../hooks/useErrorMessage";
import usePageTitle from "../hooks/usePageTitle";
import useSuccessMessage from "../hooks/useSuccessMessage";

function Home() {
    useErrorMessage();
    useSuccessMessage();
    usePageTitle("About");

    return (
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam dicta
            quas harum inventore vel ipsum quae quibusdam minima quasi, adipisci
            consequuntur? Distinctio, qui doloribus voluptatibus nisi libero
            amet id esse dolorem dignissimos ratione. Aliquam, ipsa. Accusantium
            veritatis placeat facilis. At dignissimos ipsam odit doloribus
            repellendus quae sed laborum voluptatem soluta excepturi animi illo,
            illum ad labore accusantium fuga natus itaque quam, error non ipsum
            omnis, quidem necessitatibus? Nemo, magni! Error, laboriosam eaque?
            Maiores in optio corrupti! Maiores eveniet esse voluptatibus impedit
            rem, incidunt ratione alias unde ducimus laudantium! Quisquam
            aperiam dignissimos hic corrupti maxime aliquam magnam voluptatem
            labore voluptatum laborum?
        </p>
    );
}

export default Home;
