import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogConfirmationComponent } from "src/app/dialog-confirmation/dialog-confirmation.component";

@Injectable({
    providedIn: 'root'
})
export class PromptDialogService{

    constructor(private dialog: MatDialog) {
        
    }

    openDialog(){
        const dConfig = new MatDialogConfig();
        dConfig.width = '30%';
        dConfig.hasBackdrop = true;
        dConfig.disableClose = true;
        const dialogRef = this.dialog.open(DialogConfirmationComponent, dConfig);
        return dialogRef.afterClosed();
    }

}