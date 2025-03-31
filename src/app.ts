
import { Config } from './config/config';
import { RequestService } from './services/request-service';

async function getStateInput(): Promise<string> {

    return new Promise((resolve, reject) => {
        process.stdout.write("Enter a state you would like to find a brewery in: ");
        process.stdin.once("data", (data) => {
            const input = data.toString().trim()
            if (input == "") {
                reject(new Error("State input cannot be blank"))
            } else {
                resolve(input)
            }
    
            process.stdin.pause();
        });
    });

}

async function main() {

    try {
        // get state input from user
         const state = await getStateInput()
        console.log(`Picking a brewery in ${state} to try`);

        const config = new Config();
        const requestService = new RequestService(config);
    
        const response = await requestService.getBreweriesByState(state);
        console.log("response: ", response.data)
    } catch (error) {
        console.log("Error", error)
        process.exit(1)
    }

}

main()
    .then(() => {
        console.log("Done!")
        process.exit(0)
    })