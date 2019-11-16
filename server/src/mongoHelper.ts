import * as mongo from 'mongodb';

export class MongoHelper{
    public static client: mongo.MongoClient;
    private static USER: string | undefined = process.env.MONGODBUSERNAME;
    private static PASSWORD: string | undefined = process.env.MONGODBPASSWORD;

    constructor(){}

    public static connect(): Promise<any> {
        let uri = "mongodb+srv://" + this.USER + ":" + this.PASSWORD + "@courses-fv3mh.mongodb.net/test?retryWrites=true&w=majority";
        return new Promise<any>((resolve, reject) => {
            mongo.MongoClient.connect(uri, {useNewUrlParser: true}, (err, client: mongo.MongoClient) => {
                if(err) {
                    console.log("something went wrong");
                    reject(err);
                } else {
                    console.log("successful connection");
                    MongoHelper.client = client;
                    resolve(client);
                }
            });
        });
    }

    public disconnect(): void {
        MongoHelper.client.close();
    }
}